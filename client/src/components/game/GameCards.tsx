
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
  gameSeconds: number;
  dragonCard: string | null;
  tigerCard: string | null;
  roundWinner: string | null;
}

export default function GameCards({ currentPhase, timeRemaining, gameSeconds, dragonCard, tigerCard, roundWinner }: GameCardsProps) {
  const [flipped, setFlipped] = useState([false, false]);
  const [winner, setWinner] = useState<number | null>(null);

  useEffect(() => {
    if (gameSeconds === 0 || gameSeconds < 15) {
      setFlipped([false, false]);
      setWinner(null);
    }
    else if (gameSeconds === 15) {
      setFlipped([true, false]);
    }
    else if (gameSeconds === 16) {
      setFlipped([true, true]);
    }
    else if (gameSeconds === 17) {
      if (roundWinner === 'dragon') setWinner(0);
      else if (roundWinner === 'tiger') setWinner(1);
      else setWinner(null);
    }
  }, [gameSeconds, roundWinner]);

  return (
    <>
      <style>{`
        .card-wrapper {
          perspective: 1200px;
          width: 120px;
          height: 170px;
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
        .winner .card-front {
          animation: cardGlow 0.6s ease-in-out 2;
        }
        @keyframes cardGlow {
          0% { 
            transform: rotateY(180deg) scale(1); 
            filter: drop-shadow(0 2px 8px rgba(0,0,0,0.13)); 
          }
          50% { 
            transform: rotateY(180deg) scale(1.09); 
            filter: drop-shadow(0 0 18px 4px gold); 
          }
          100% { 
            transform: rotateY(180deg) scale(1); 
            filter: drop-shadow(0 2px 8px rgba(0,0,0,0.13)); 
          }
        }
      `}</style>
      <div className="flex gap-32 justify-center items-center bg-transparent">
        <Card cardString={dragonCard} flipped={flipped[0]} winner={winner === 0} />
        <Card cardString={tigerCard} flipped={flipped[1]} winner={winner === 1} />
      </div>
    </>
  );
}
