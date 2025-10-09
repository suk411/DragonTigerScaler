import React, { useState, useEffect } from 'react';
import './GameCards.css';

interface GameCardsProps {
  cards: Card[];
  onCardClick: (card: Card) => void;
  revealedCards: Card[];
  winnerCard: Card | null;
}

const GameCards: React.FC<GameCardsProps> = ({ cards, onCardClick, revealedCards, winnerCard }) => {
  const [isFlipped, setIsFlipped] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // Initialize isFlipped state based on revealedCards
    const initialFlipState: { [key: string]: boolean } = {};
    revealedCards.forEach(card => {
      initialFlipState[card.id] = true;
    });
    setIsFlipped(initialFlipState);
  }, [revealedCards]);

  const handleClick = (card: Card) => {
    if (!isFlipped[card.id] && revealedCards.length < 2) {
      onCardClick(card);
    }
  };

  const isWinner = (card: Card): boolean => {
    return winnerCard !== null && winnerCard.id === card.id;
  };

  return (
    <div className="game-cards">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`card ${isFlipped[card.id] ? 'flipped' : ''} ${isWinner(card) ? 'winner' : ''}`}
          onClick={() => handleClick(card)}
        >
          <div className="card-inner">
            <div className="card-front">
              <img src={card.imageUrl} alt="Card Front" />
            </div>
            <div className="card-back">
              <img src="/path/to/card-back.png" alt="Card Back" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameCards;

interface Card {
  id: string;
  imageUrl: string;
  // Add other card properties as needed
}
</original>
<changes>
Replacing
<old_str>
import React, { useState, useEffect } from 'react';
import './GameCards.css';

interface GameCardsProps {
  cards: Card[];
  onCardClick: (card: Card) => void;
  revealedCards: Card[];
  winnerCard: Card | null;
}

const GameCards: React.FC<GameCardsProps> = ({ cards, onCardClick, revealedCards, winnerCard }) => {
  const [isFlipped, setIsFlipped] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // Initialize isFlipped state based on revealedCards
    const initialFlipState: { [key: string]: boolean } = {};
    revealedCards.forEach(card => {
      initialFlipState[card.id] = true;
    });
    setIsFlipped(initialFlipState);
  }, [revealedCards]);

  const handleClick = (card: Card) => {
    if (!isFlipped[card.id] && revealedCards.length < 2) {
      onCardClick(card);
    }
  };

  const isWinner = (card: Card): boolean => {
    return winnerCard !== null && winnerCard.id === card.id;
  };

  return (
    <div className="game-cards">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`card ${isFlipped[card.id] ? 'flipped' : ''} ${isWinner(card) ? 'winner' : ''}`}
          onClick={() => handleClick(card)}
        >
          <div className="card-inner">
            <div className="card-front">
              <img src={card.imageUrl} alt="Card Front" />
            </div>
            <div className="card-back">
              <img src="/path/to/card-back.png" alt="Card Back" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameCards;

interface Card {
  id: string;
  imageUrl: string;
  // Add other card properties as needed
}
</old_str>
with
<new_str>
import React, { useState, useEffect } from 'react';
import PlayingCard from './PlayingCard'; // Assuming PlayingCard component is in a separate file
import './GameCards.css';

interface GameCardsProps {
  cards: Card[];
  onCardClick: (card: Card) => void;
  revealedCards: Card[];
  winnerCard: Card | null;
}

const GameCards: React.FC<GameCardsProps> = ({ cards, onCardClick, revealedCards, winnerCard }) => {
  const handleClick = (card: Card) => {
    // Logic to handle card clicks, e.g., only allow clicking if card is not already revealed and less than 2 cards are revealed
    onCardClick(card);
  };

  const isCardRevealed = (card: Card): boolean => {
    return revealedCards.some(revealedCard => revealedCard.id === card.id);
  };

  return (
    <div className="game-cards">
      {cards.map((card) => (
        <PlayingCard
          key={card.id}
          card={card}
          isRevealed={isCardRevealed(card)}
          onClick={handleClick}
          isWinner={winnerCard !== null && winnerCard.id === card.id}
        />
      ))}
    </div>
  );
};

export default GameCards;

interface Card {
  id: string;
  imageUrl: string;
  // Add other card properties as needed
}
</new_str>
</changes>
<changes>
Remove duplicate card glow animation from GameCards
Replacing
<old_str>
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
</old_str>
with
<new_str>
.card-front {
          transform: rotateY(180deg);
        }
      `}</style>
</new_str>
</changes>
<replit_final_file>
import React, { useState, useEffect } from 'react';
import PlayingCard from './PlayingCard'; // Assuming PlayingCard component is in a separate file
import './GameCards.css';

interface GameCardsProps {
  cards: Card[];
  onCardClick: (card: Card) => void;
  revealedCards: Card[];
  winnerCard: Card | null;
}

const GameCards: React.FC<GameCardsProps> = ({ cards, onCardClick, revealedCards, winnerCard }) => {
  const handleClick = (card: Card) => {
    // Logic to handle card clicks, e.g., only allow clicking if card is not already revealed and less than 2 cards are revealed
    onCardClick(card);
  };

  const isCardRevealed = (card: Card): boolean => {
    return revealedCards.some(revealedCard => revealedCard.id === card.id);
  };

  return (
    <div className="game-cards">
      {cards.map((card) => (
        <PlayingCard
          key={card.id}
          card={card}
          isRevealed={isCardRevealed(card)}
          onClick={handleClick}
          isWinner={winnerCard !== null && winnerCard.id === card.id}
        />
      ))}
    </div>
  );
};

export default GameCards;

interface Card {
  id: string;
  imageUrl: string;
  // Add other card properties as needed
}