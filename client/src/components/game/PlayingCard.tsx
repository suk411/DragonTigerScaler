
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
        @keyframes cardGlow {
          0%, 100% { 
            filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.5));
          }
          50% { 
            filter: drop-shadow(0 0 25px rgba(255, 215, 0, 1)) drop-shadow(0 0 40px rgba(255, 215, 0, 0.8));
          }
        }
        .winner-card {
          animation: cardGlow 0.8s ease-in-out infinite;
        }
      `}</style>
      <svg width="63" height="91" viewBox="0 0 63 91" className={`rounded-lg ${winner ? 'winner-card' : ''}`}>
      {flipped ? (
        <>
          {/* Card Front */}
          <rect width="63" height="91" rx="8" fill="white" stroke="#d1d5db" strokeWidth="2"/>
          
          {/* Top-left corner */}
          <text x="8" y="18" fontSize="14" fontWeight="bold" fill={color}>
            {displayRank}
          </text>
          <text x="8" y="34" fontSize="16" fill={color}>
            {suitSymbol}
          </text>
          
          {/* Center suit symbol */}
          <text x="31.5" y="55" fontSize="28" fill={color} textAnchor="middle">
            {suitSymbol}
          </text>
          
          {/* Bottom-right corner (rotated) */}
          <g transform="rotate(180, 31.5, 45.5)">
            <text x="8" y="18" fontSize="14" fontWeight="bold" fill={color}>
              {displayRank}
            </text>
            <text x="8" y="34" fontSize="16" fill={color}>
              {suitSymbol}
            </text>
          </g>
        </>
      ) : (
        <>
          {/* Card Back */}
          <rect width="63" height="91" rx="8" fill="#1e3a8a" stroke="#1e40af" strokeWidth="2"/>
          <rect x="8" y="8" width="47" height="75" rx="4" fill="#3b82f6" opacity="0.3"/>
          <circle cx="31.5" cy="45.5" r="15" fill="#60a5fa" opacity="0.5"/>
        </>
      )}
      </svg>
    </>
  );
}
