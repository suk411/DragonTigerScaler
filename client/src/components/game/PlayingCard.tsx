interface PlayingCardProps {
  rank: string;
  suit: string;
  flipped?: boolean;
  winner?: boolean;
}

export default function PlayingCard({ rank, suit, flipped = false, winner = false }: PlayingCardProps) {
  const getSuitColor = () => {
    return suit === 'hearts' || suit === 'diamonds' ? '#dc2626' : '#1f2937';
  };

  const getSuitSymbol = () => {
    const symbols = {
      hearts: '♥',
      diamonds: '♦',
      clubs: '♣',
      spades: '♠'
    };
    return symbols[suit as keyof typeof symbols] || '';
  };

  const getRankDisplay = () => {
    const displays: Record<string, string> = {
      'a': 'A', '2': '2', '3': '3', '4': '4', '5': '5',
      '6': '6', '7': '7', '8': '8', '9': '9', '10': '10',
      'j': 'J', 'q': 'Q', 'k': 'K'
    };
    return displays[rank.toLowerCase()] || rank.toUpperCase();
  };

  const color = getSuitColor();
  const suitSymbol = getSuitSymbol();
  const displayRank = getRankDisplay();

  return (
    <>
      <style>{`
        @keyframes winnerCardGlow {
          0%, 100% { 
            filter: drop-shadow(0 0 0px transparent);
            transform: scale(1);
          }
          25% { 
            filter: drop-shadow(0 0 20px #fbbf24) drop-shadow(0 0 30px #fbbf24);
            transform: scale(1.09);
          }
          50% { 
            filter: drop-shadow(0 0 0px transparent);
            transform: scale(1);
          }
          75% { 
            filter: drop-shadow(0 0 20px #fbbf24) drop-shadow(0 0 30px #fbbf24);
            transform: scale(1.09);
          }
        }
        
        .winner-card {
          animation: winnerCardGlow 1.2s ease-in-out;
        }
      `}</style>
      <svg width="126" height="164" viewBox="0 0 126 164" className={`rounded-lg ${winner ? 'winner-card' : ''}`}>
        {flipped ? (
          <>
            {/* Card Front */}
            <rect width="126" height="164" rx="16" fill="white" stroke="#d1d5db" strokeWidth="2" />

            {/* Top-left corner (larger rank & suit) */}
            <text x="12" y="32" fontSize="30" fontWeight="bold" fill={color}>
              {displayRank}
            </text>
            <text x="12" y="62" fontSize="34" fill={color}>
              {suitSymbol}
            </text>

            {/* Center large suit symbol (bigger & slightly lower) */}
            <text x="66" y="125" fontSize="110" fill={color} textAnchor="middle">
              {suitSymbol}
            </text>
          </>
        ) : (
          <>
            {/* Card Back */}
            <rect width="126" height="164" rx="16" fill="url(#checkerboard)" stroke="white" strokeWidth="6" />
            <defs>
              <pattern id="checkerboard" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                <rect width="6" height="6" fill="#dc2626" />
                <rect x="6" y="0" width="6" height="6" fill="white" />
                <rect x="0" y="6" width="6" height="6" fill="white" />
                <rect x="6" y="6" width="6" height="6" fill="#dc2626" />
              </pattern>
            </defs>
            <rect width="126" height="164" rx="16" fill="white" opacity="0.1" />
          </>
        )}
      </svg>
    </>
  );
}
