import React, { useState, useEffect } from "react";
import cardBack from "../assets/cards/card-back.svg";

// Import all 52 card SVGs - Hearts
import aceHearts from "../assets/cards/ace-hearts.svg";
import twoHearts from "../assets/cards/2-hearts.svg";
import threeHearts from "../assets/cards/3-hearts.svg";
import fourHearts from "../assets/cards/4-hearts.svg";
import fiveHearts from "../assets/cards/5-hearts.svg";
import sixHearts from "../assets/cards/6-hearts.svg";
import sevenHearts from "../assets/cards/7-hearts.svg";
import eightHearts from "../assets/cards/8-hearts.svg";
import nineHearts from "../assets/cards/9-hearts.svg";
import tenHearts from "../assets/cards/10-hearts.svg";
import jackHearts from "../assets/cards/jack-hearts.svg";
import queenHearts from "../assets/cards/queen-hearts.svg";
import kingHearts from "../assets/cards/king-hearts.svg";

// Diamonds
import aceDiamonds from "../assets/cards/ace-diamonds.svg";
import twoDiamonds from "../assets/cards/2-diamonds.svg";
import threeDiamonds from "../assets/cards/3-diamonds.svg";
import fourDiamonds from "../assets/cards/4-diamonds.svg";
import fiveDiamonds from "../assets/cards/5-diamonds.svg";
import sixDiamonds from "../assets/cards/6-diamonds.svg";
import sevenDiamonds from "../assets/cards/7-diamonds.svg";
import eightDiamonds from "../assets/cards/8-diamonds.svg";
import nineDiamonds from "../assets/cards/9-diamonds.svg";
import tenDiamonds from "../assets/cards/10-diamonds.svg";
import jackDiamonds from "../assets/cards/jack-diamonds.svg";
import queenDiamonds from "../assets/cards/queen-diamonds.svg";
import kingDiamonds from "../assets/cards/king-diamonds.svg";

// Clubs
import aceClubs from "../assets/cards/ace-clubs.svg";
import twoClubs from "../assets/cards/2-clubs.svg";
import threeClubs from "../assets/cards/3-clubs.svg";
import fourClubs from "../assets/cards/4-clubs.svg";
import fiveClubs from "../assets/cards/5-clubs.svg";
import sixClubs from "../assets/cards/6-clubs.svg";
import sevenClubs from "../assets/cards/7-clubs.svg";
import eightClubs from "../assets/cards/8-clubs.svg";
import nineClubs from "../assets/cards/9-clubs.svg";
import tenClubs from "../assets/cards/10-clubs.svg";
import jackClubs from "../assets/cards/jack-clubs.svg";
import queenClubs from "../assets/cards/queen-clubs.svg";
import kingClubs from "../assets/cards/king-clubs.svg";

// Spades
import aceSpades from "../assets/cards/ace-spades.svg";
import twoSpades from "../assets/cards/2-spades.svg";
import threeSpades from "../assets/cards/3-spades.svg";
import fourSpades from "../assets/cards/4-spades.svg";
import fiveSpades from "../assets/cards/5-spades.svg";
import sixSpades from "../assets/cards/6-spades.svg";
import sevenSpades from "../assets/cards/7-spades.svg";
import eightSpades from "../assets/cards/8-spades.svg";
import nineSpades from "../assets/cards/9-spades.svg";
import tenSpades from "../assets/cards/10-spades.svg";
import jackSpades from "../assets/cards/jack-spades.svg";
import queenSpades from "../assets/cards/queen-spades.svg";
import kingSpades from "../assets/cards/king-spades.svg";

// Card mapping object - All 52 cards
const CARD_IMAGES: Record<string, string> = {
  // Hearts
  "ace-hearts": aceHearts, "2-hearts": twoHearts, "3-hearts": threeHearts, "4-hearts": fourHearts, 
  "5-hearts": fiveHearts, "6-hearts": sixHearts, "7-hearts": sevenHearts, "8-hearts": eightHearts, 
  "9-hearts": nineHearts, "10-hearts": tenHearts, "jack-hearts": jackHearts, "queen-hearts": queenHearts, "king-hearts": kingHearts,
  
  // Diamonds
  "ace-diamonds": aceDiamonds, "2-diamonds": twoDiamonds, "3-diamonds": threeDiamonds, "4-diamonds": fourDiamonds,
  "5-diamonds": fiveDiamonds, "6-diamonds": sixDiamonds, "7-diamonds": sevenDiamonds, "8-diamonds": eightDiamonds,
  "9-diamonds": nineDiamonds, "10-diamonds": tenDiamonds, "jack-diamonds": jackDiamonds, "queen-diamonds": queenDiamonds, "king-diamonds": kingDiamonds,
  
  // Clubs
  "ace-clubs": aceClubs, "2-clubs": twoClubs, "3-clubs": threeClubs, "4-clubs": fourClubs,
  "5-clubs": fiveClubs, "6-clubs": sixClubs, "7-clubs": sevenClubs, "8-clubs": eightClubs,
  "9-clubs": nineClubs, "10-clubs": tenClubs, "jack-clubs": jackClubs, "queen-clubs": queenClubs, "king-clubs": kingClubs,
  
  // Spades
  "ace-spades": aceSpades, "2-spades": twoSpades, "3-spades": threeSpades, "4-spades": fourSpades,
  "5-spades": fiveSpades, "6-spades": sixSpades, "7-spades": sevenSpades, "8-spades": eightSpades,
  "9-spades": nineSpades, "10-spades": tenSpades, "jack-spades": jackSpades, "queen-spades": queenSpades, "king-spades": kingSpades,
};

function getCardImage(cardString: string | null): string {
  if (!cardString) return cardBack;
  
  // cardString format: "5-hearts", "ace-spades", etc.
  const cardKey = cardString.toLowerCase();
  return CARD_IMAGES[cardKey] || cardBack;
}

interface CardProps {
  cardString: string | null;
  flipped: boolean;
  winner: boolean;
}

function Card({ cardString, flipped, winner }: CardProps) {
  const cardImage = getCardImage(cardString);
  
  return (
    <div className="card-wrapper">
      <div className={`card ${flipped ? "flipped" : ""} ${winner ? "winner" : ""}`}>
        <div className="card-face card-back">
          <img src={cardBack} alt="Card back" className="card-image" draggable="false" />
        </div>
        <div className="card-face card-front">
          <img src={cardImage} alt={cardString || "Card"} className="card-image" draggable="false" />
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
          justify-content: center;
        }
        .card-back {
          transform: rotateY(0deg);
        }
        .card-front {
          transform: rotateY(180deg);
        }
        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
        }
        .winner .card-image {
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

export default GameCards;
export type { GameCardsProps };
