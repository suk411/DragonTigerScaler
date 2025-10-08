import { useState, useEffect } from "react";

interface CardProps {
  cardString: string | null;
  flipped: boolean;
  winner: boolean;
}

function Card({ cardString, flipped, winner }: CardProps) {
  // For now, use a simple colored card representation
  // In production, you would import actual card SVGs
  const getCardDisplay = () => {
    if (!cardString) return { color: "#1e40af", text: "?" };
    
    const [rank, suit] = cardString.split("-");
    const isRed = suit === "hearts" || suit === "diamonds";
    const color = isRed ? "#dc2626" : "#1f2937";
    const suitSymbol = {
      hearts: "♥",
      diamonds: "♦",
      clubs: "♣",
      spades: "♠"
    }[suit] || "";
    
    return { color, text: `${rank.toUpperCase()} ${suitSymbol}` };
  };

  const cardDisplay = getCardDisplay();
  
  return (
    <div className="card-wrapper">
      <div className={`card ${flipped ? "flipped" : ""} ${winner ? "winner" : ""}`}>
        <div className="card-face card-back">
          <div className="w-full h-full bg-blue-900 rounded-lg border-2 border-blue-600 flex items-center justify-center">
            <div className="text-4xl text-blue-300">🃏</div>
          </div>
        </div>
        <div className="card-face card-front">
          <div 
            className="w-full h-full bg-white rounded-lg border-2 border-gray-300 flex items-center justify-center font-bold text-lg"
            style={{ color: cardDisplay.color }}
          >
            {cardDisplay.text}
          </div>
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
      setFlipped([false, false]);
      setWinner(null);
    } else if (currentPhase === 'revealing') {
      if (timeRemaining <= 10 && timeRemaining > 7) {
        setFlipped([true, false]);
        setWinner(null);
      } else if (timeRemaining <= 7 && timeRemaining > 2) {
        setFlipped([true, true]);
        if (roundWinner === 'dragon') setWinner(0);
        else if (roundWinner === 'tiger') setWinner(1);
        else setWinner(null);
      } else if (timeRemaining <= 2) {
        setFlipped([false, false]);
        setWinner(null);
      }
    }
  }, [currentPhase, timeRemaining, roundWinner]);

  return (
    <>
      <style>{`
        .card-wrapper {
          perspective: 1200px;
          width: 63px;
          height: 91px;
          margin: 6px;
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
        .winner .card-face {
          animation: glowZoom 0.6s ease-in-out 2;
        }
        @keyframes glowZoom {
          0% { transform: scale(1); filter: drop-shadow(0 2px 8px rgba(0,0,0,0.13)); }
          50% { transform: scale(1.09); filter: drop-shadow(0 0 18px 4px gold); }
          100% { transform: scale(1); filter: drop-shadow(0 2px 8px rgba(0,0,0,0.13)); }
        }
      `}</style>
      <div className="flex gap-24 justify-center items-center bg-transparent">
        <Card cardString={dragonCard} flipped={flipped[0]} winner={winner === 0} />
        <Card cardString={tigerCard} flipped={flipped[1]} winner={winner === 1} />
      </div>
    </>
  );
}
