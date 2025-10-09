
import { createContext, useContext, useState, useEffect } from "react";

interface GameRound {
  id: number;
  dragon_card: string | null;
  tiger_card: string | null;
  winner: string | null;
}

interface GameManagerContextType {
  balance: number;
  placeBet: (betType: string, amount: number) => Promise<boolean>;
  getTotalBets: (betType: string) => number;
  currentRound: GameRound;
  updateBalance: () => void;
  clearBets: () => void;
  roundHistory: string[];
}

const GameManagerContext = createContext<GameManagerContextType | null>(null);

export function GameManagerProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState(10000);
  const [currentRound, setCurrentRound] = useState<GameRound>({
    id: 1,
    dragon_card: null,
    tiger_card: null,
    winner: null,
  });
  const [bets, setBets] = useState<Record<string, number>>({
    dragon: 0,
    tiger: 0,
    tie: 0,
  });
  const [roundHistory, setRoundHistory] = useState<string[]>([]);

  // Generate new round every 25 seconds (15s betting + 10s revealing)
  useEffect(() => {
    const generateRound = () => {
      const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
      const ranks = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k'];
      
      const dragonSuit = suits[Math.floor(Math.random() * suits.length)];
      const dragonRank = ranks[Math.floor(Math.random() * ranks.length)];
      const dragonCard = `${dragonRank}-${dragonSuit}`;
      
      const tigerSuit = suits[Math.floor(Math.random() * suits.length)];
      const tigerRank = ranks[Math.floor(Math.random() * ranks.length)];
      const tigerCard = `${tigerRank}-${tigerSuit}`;
      
      // Determine winner based on rank
      const getRankValue = (rank: string) => {
        const rankMap: Record<string, number> = {
          'a': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7,
          '8': 8, '9': 9, '10': 10, 'j': 11, 'q': 12, 'k': 13
        };
        return rankMap[rank] || 0;
      };
      
      const dragonValue = getRankValue(dragonRank);
      const tigerValue = getRankValue(tigerRank);
      
      let winner: string;
      if (dragonValue > tigerValue) {
        winner = 'dragon';
      } else if (tigerValue > dragonValue) {
        winner = 'tiger';
      } else {
        winner = 'tie';
      }
      
      const newRound = {
        id: Date.now(),
        dragon_card: dragonCard,
        tiger_card: tigerCard,
        winner: winner,
      };
      
      setCurrentRound(newRound);
      
      // Add to history (keep last 10, newest on right)
      setRoundHistory(prev => {
        const updated = [...prev, winner];
        // Keep only the last 10 results
        if (updated.length > 10) {
          return updated.slice(-10);
        }
        return updated;
      });
    };

    generateRound();
    const interval = setInterval(generateRound, 25000);
    return () => clearInterval(interval);
  }, []);

  const placeBet = async (betType: string, amount: number): Promise<boolean> => {
    if (balance < amount) return false;

    setBets(prev => ({
      ...prev,
      [betType]: prev[betType as keyof typeof prev] + amount,
    }));
    setBalance(prev => prev - amount);
    return true;
  };

  const getTotalBets = (betType: string): number => {
    return bets[betType as keyof typeof bets] || 0;
  };

  const updateBalance = () => {
    if (!currentRound.winner) return;

    const winnerBet = bets[currentRound.winner as keyof typeof bets];
    if (winnerBet > 0) {
      const multiplier = currentRound.winner === "tie" ? 10 : 2;
      const winnings = winnerBet * multiplier;
      setBalance(prev => prev + winnings);
    }
  };

  const clearBets = () => {
    setBets({ dragon: 0, tiger: 0, tie: 0 });
  };

  const gameManager = {
    balance,
    placeBet,
    getTotalBets,
    currentRound,
    updateBalance,
    clearBets,
    roundHistory,
  };

  return (
    <GameManagerContext.Provider value={gameManager}>
      {children}
    </GameManagerContext.Provider>
  );
}

export function useGameManagerContext() {
  const context = useContext(GameManagerContext);
  if (!context) {
    throw new Error("useGameManagerContext must be used within GameManagerProvider");
  }
  return context;
}
