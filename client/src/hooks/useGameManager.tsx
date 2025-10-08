import { useState, useEffect } from "react";

interface GameRound {
  id: number;
  dragon_card: string | null;
  tiger_card: string | null;
  winner: string | null;
}

interface BetData {
  dragon: number;
  tiger: number;
  tie: number;
}

export function useGameManager() {
  const [balance, setBalance] = useState(10000);
  const [currentBets, setCurrentBets] = useState<BetData>({ dragon: 0, tiger: 0, tie: 0 });
  const [totalBets, setTotalBets] = useState<BetData>({ dragon: 0, tiger: 0, tie: 0 });
  const [currentRound, setCurrentRound] = useState<GameRound>({
    id: 1,
    dragon_card: null,
    tiger_card: null,
    winner: null,
  });

  const placeBet = async (betType: string, amount: number): Promise<boolean> => {
    if (balance < amount) return false;

    setBalance(prev => prev - amount);
    setCurrentBets(prev => ({
      ...prev,
      [betType]: prev[betType as keyof BetData] + amount,
    }));
    setTotalBets(prev => ({
      ...prev,
      [betType]: prev[betType as keyof BetData] + amount,
    }));

    return true;
  };

  const getTotalBets = (betType: string): number => {
    return totalBets[betType as keyof BetData] || 0;
  };

  // Simulate game rounds (for demo purposes)
  useEffect(() => {
    const interval = setInterval(() => {
      // Generate random cards and winner every 25 seconds
      const cards = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
      const suits = ["hearts", "diamonds", "clubs", "spades"];
      
      const dragonCard = `${cards[Math.floor(Math.random() * cards.length)]}-${suits[Math.floor(Math.random() * suits.length)]}`;
      const tigerCard = `${cards[Math.floor(Math.random() * cards.length)]}-${suits[Math.floor(Math.random() * suits.length)]}`;
      
      const dragonValue = cards.indexOf(dragonCard.split('-')[0]);
      const tigerValue = cards.indexOf(tigerCard.split('-')[0]);
      
      let winner = "tie";
      if (dragonValue > tigerValue) winner = "dragon";
      else if (tigerValue > dragonValue) winner = "tiger";

      setCurrentRound({
        id: Date.now(),
        dragon_card: dragonCard,
        tiger_card: tigerCard,
        winner,
      });

      // Calculate winnings
      if (currentBets[winner as keyof BetData] > 0) {
        const multiplier = winner === "tie" ? 10 : 2;
        const winnings = currentBets[winner as keyof BetData] * multiplier;
        setBalance(prev => prev + winnings);
      }

      // Reset current bets
      setCurrentBets({ dragon: 0, tiger: 0, tie: 0 });
    }, 25000);

    return () => clearInterval(interval);
  }, [currentBets]);

  return {
    balance,
    placeBet,
    getTotalBets,
    currentRound,
  };
}
