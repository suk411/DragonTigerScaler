import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useGameManager } from "@/hooks/useGameManager";

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
}

const GameManagerContext = createContext<GameManagerContextType | null>(null);

export function GameManagerProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState(1000);
  const [selectedChip, setSelectedChip] = useState<number | null>(null);
  const [currentRound, setCurrentRound] = useState<any>(null);
  const [gamePhase, setGamePhase] = useState<'betting' | 'revealing' | 'result'>('betting');
  const [bets, setBets] = useState<Record<string, number>>({
    dragon: 0,
    tiger: 0,
    tie: 0,
  });

  useEffect(() => {
    // Initialize round
    const initRound = async () => {
      try {
        const response = await fetch('/api/round/start', { method: 'POST' });
        const data = await response.json();
        setCurrentRound(data.round);
      } catch (error) {
        console.error('Failed to start round:', error);
      }
    };
    initRound();
  }, []);

  // These values would come from the useGameManager hook in a real implementation
  // For now, we'll mock them to make the provider work
  const gameManager = {
    balance,
    placeBet: async (betType: string, amount: number): Promise<boolean> => {
      setBets(prevBets => ({ ...prevBets, [betType]: prevBets[betType] + amount }));
      setBalance(prevBalance => prevBalance - amount);
      return true;
    },
    getTotalBets: (betType: string): number => {
      return bets[betType];
    },
    currentRound: currentRound || { id: 0, dragon_card: null, tiger_card: null, winner: null },
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