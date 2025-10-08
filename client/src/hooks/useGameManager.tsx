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
  const [isDragonSelected, setIsDragonSelected] = useState(false);
  const [isTigerSelected, setIsTigerSelected] = useState(false);
  const [isTieSelected, setIsTieSelected] = useState(false);
  const [winningArea, setWinningArea] = useState<string | null>(null);

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

    // Highlight the betting area border
    if (betType === 'dragon') setIsDragonSelected(true);
    if (betType === 'tiger') setIsTigerSelected(true);
    if (betType === 'tie') setIsTieSelected(true);

    // Remove highlight after a short delay
    setTimeout(() => {
      if (betType === 'dragon') setIsDragonSelected(false);
      if (betType === 'tiger') setIsTigerSelected(false);
      if (betType === 'tie') setIsTieSelected(false);
    }, 200); // 200ms for a quick flash

    return true;
  };

  const getTotalBets = (betType: string): number => {
    return totalBets[betType as keyof BetData] || 0;
  };

  // Simulate game rounds (for demo purposes)
  useEffect(() => {
    const interval = setInterval(() => {
      // Determine the winner based on lower total bets, unless it's a tie
      let winner = "tie";
      const dragonTotal = getTotalBets('dragon');
      const tigerTotal = getTotalBets('tiger');
      const tieTotal = getTotalBets('tie');

      if (dragonTotal < tigerTotal && dragonTotal < tieTotal) {
        winner = "dragon";
      } else if (tigerTotal < dragonTotal && tigerTotal < tieTotal) {
        winner = "tiger";
      } else if (dragonTotal === tigerTotal && dragonTotal < tieTotal) {
        // If dragon and tiger bets are equal and lower than tie, choose one (e.g., dragon)
        winner = "dragon";
      } else if (dragonTotal === tieTotal && dragonTotal < tigerTotal) {
        // If dragon and tie bets are equal and lower than tiger, choose one (e.g., dragon)
        winner = "dragon";
      } else if (tigerTotal === tieTotal && tigerTotal < dragonTotal) {
        // If tiger and tie bets are equal and lower than dragon, choose one (e.g., tiger)
        winner = "tiger";
      } else if (dragonTotal === tigerTotal && dragonTotal === tieTotal) {
        // If all are equal, it's a tie
        winner = "tie";
      }


      // Generate random cards (these will be displayed but winner is determined by logic above)
      const cards = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
      const suits = ["hearts", "diamonds", "clubs", "spades"];

      const dragonCard = `${cards[Math.floor(Math.random() * cards.length)]}-${suits[Math.floor(Math.random() * suits.length)]}`;
      const tigerCard = `${cards[Math.floor(Math.random() * cards.length)]}-${suits[Math.floor(Math.random() * suits.length)]}`;

      setCurrentRound({
        id: Date.now(),
        dragon_card: dragonCard,
        tiger_card: tigerCard,
        winner,
      });

      // Highlight the winning area
      setWinningArea(winner);

      // Reset winning area highlight after 2 seconds
      setTimeout(() => {
        setWinningArea(null);
      }, 2000);

      // Calculate winnings based on the determined winner
      const currentWinnerBet = currentBets[winner as keyof BetData];
      if (currentWinnerBet > 0) {
        const multiplier = winner === "tie" ? 10 : 2;
        const winnings = currentWinnerBet * multiplier;
        setBalance(prev => prev + winnings);
      }

      // Reset current bets and total bets for the next round
      setCurrentBets({ dragon: 0, tiger: 0, tie: 0 });
      setTotalBets({ dragon: 0, tiger: 0, tie: 0 });
    }, 15000); // Reduced interval for faster testing

    return () => clearInterval(interval);
  }, []); // Removed dependencies that caused rapid re-triggering

  return {
    balance,
    placeBet,
    getTotalBets,
    currentRound,
    isDragonSelected,
    isTigerSelected,
    isTieSelected,
    winningArea,
  };
}