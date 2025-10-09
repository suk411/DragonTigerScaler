
import React, { useState, useEffect } from 'react';
import PlayingCard from './PlayingCard';

interface GameCardsProps {
  currentPhase: 'betting' | 'revealing';
  timeRemaining: number;
  dragonCard: string | null;
  tigerCard: string | null;
  roundWinner: string | null;
}

function GameCards({ currentPhase, timeRemaining, dragonCard, tigerCard, roundWinner }: GameCardsProps) {
  const [flipped, setFlipped] = useState([false, false]);
  const [winner, setWinner] = useState<number | null>(null);

  useEffect(() => {
    if (currentPhase === 'betting') {
      // Betting phase (15 seconds): cards stay face down
      setFlipped([false, false]);
      setWinner(null);
    } else if (currentPhase === 'revealing') {
      // Result phase (10 seconds total)
      if (timeRemaining <= 10 && timeRemaining > 7) {
        // First 3 seconds (10-7s): flip first card (dragon)
        setFlipped([true, false]);
        setWinner(null);
      } else if (timeRemaining <= 7 && timeRemaining > 2) {
        // Next 5 seconds (7-2s): flip second card (tiger) and show winner
        setFlipped([true, true]);
        // Determine winner from server data
        if (roundWinner === 'dragon') setWinner(0);
        else if (roundWinner === 'tiger') setWinner(1);
        else setWinner(null); // tie
      } else if (timeRemaining <= 2) {
        // Last 2 seconds (2-0s): flip cards back
        setFlipped([false, false]);
        setWinner(null);
      }
    }
  }, [currentPhase, timeRemaining, roundWinner]);

  const parseCard = (cardStr: string | null): { rank: string; suit: string } | null => {
    if (!cardStr) return null;
    const rank = cardStr.slice(0, -1);
    const suitChar = cardStr.slice(-1).toLowerCase();
    const suitMap: Record<string, string> = { h: 'hearts', d: 'diamonds', c: 'clubs', s: 'spades' };
    return { rank, suit: suitMap[suitChar] || 'spades' };
  };

  const dragon = parseCard(dragonCard);
  const tiger = parseCard(tigerCard);

  return (
    <>
      <style>{`
        .cards-container {
          display: flex;
          gap: 30px;
          align-items: center;
          justify-content: center;
        }
      `}</style>
      <div className="cards-container">
        {dragon && (
          <PlayingCard
            rank={dragon.rank}
            suit={dragon.suit}
            flipped={flipped[0]}
            winner={winner === 0}
          />
        )}
        {tiger && (
          <PlayingCard
            rank={tiger.rank}
            suit={tiger.suit}
            flipped={flipped[1]}
            winner={winner === 1}
          />
        )}
      </div>
    </>
  );
}

export default GameCards;
export type { GameCardsProps };
