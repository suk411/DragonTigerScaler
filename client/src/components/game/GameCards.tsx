
import { useState, useEffect } from "react";
import PlayingCard from "./PlayingCard";

interface CardProps {
  cardString: string | null;
  flipped: boolean;
  winner: boolean;
}

function Card({ cardString, flipped, winner }: CardProps) {
  const [rank, suit] = cardString?.split("-") || ["a", "spades"];

  return (
    <div className="card-wrapper">
      <div className={`card ${flipped ? "flipped" : ""} ${winner ? "winner" : ""}`}>
        <div className="card-face card-back">
          <PlayingCard rank={rank} suit={suit} flipped={false} />
        </div>
        <div className="card-face card-front">
          <PlayingCard rank={rank} suit={suit} flipped={true} winner={winner} />
        </div>
      </div>
    </div>
  );
}

interface GameCardsProps {
  currentPhase: 'betting' | 'revealing';
  timeRemaining: number;
  dragonCard: string | null;
  tigerCard: string | null;
  roundWinner: string | null;
}

export default function GameCards({ currentPhase, timeRemaining, dragonCard, tigerCard, roundWinner }: GameCardsProps) {
  const [flipped, setFlipped] = useState([false, false]);
  const [winner, setWinner] = useState<number | null>(null);

  useEffect(() => {
    if (currentPhase === 'betting') {
      // Reset during betting phase
      setFlipped([false, false]);
      setWinner(null);
    } else if (currentPhase === 'revealing') {
      // Revealing phase: 10 seconds total
      if (timeRemaining === 9) {
        // 1st second: flip left card (dragon)
        setFlipped([true, false]);
      } else if (timeRemaining === 8) {
        // 2nd second: flip right card (tiger)
        setFlipped([true, true]);
      } else if (timeRemaining === 7) {
        // 3rd second: glow winner card
        if (roundWinner === 'dragon') setWinner(0);
        else if (roundWinner === 'tiger') setWinner(1);
        else setWinner(null);
      }
      // 4th second (timeRemaining === 6): betting area glows (handled in BettingAreaWithBets)
      // 5th second (timeRemaining === 5): balance update (handled in BettingAreaWithBets)
      // Remaining 5 seconds: clear and prepare for next round
    }
  }, [currentPhase, timeRemaining, roundWinner]);

  return (
    <>
      <style>{`
        .card-wrapper {
          perspective: 1200px;
          width: 90px;
          height: 130px;
          margin: 8px;
        }
        .card {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 1s;
          border-radius: 8px;
        }
        .card.flipped {
          transform: rotateY(180deg);
        }
        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-center;
        }
        .card-back {
          transform: rotateY(0deg);
        }
        .card-front {
          transform: rotateY(180deg);
        }
        .card.winner {
          animation: cardGlow 0.8s ease-in-out infinite;
        }
        @keyframes cardGlow {
          0%, 100% { 
            filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.5));
          }
          50% { 
            filter: drop-shadow(0 0 25px rgba(255, 215, 0, 1)) drop-shadow(0 0 40px rgba(255, 215, 0, 0.8));
          }
        }
      `}</style>
      <div className="flex gap-24 justify-center items-center bg-transparent">
        <Card cardString={dragonCard} flipped={flipped[0]} winner={winner === 0} />
        <Card cardString={tigerCard} flipped={flipped[1]} winner={winner === 1} />
      </div>
    </>
  );
}
