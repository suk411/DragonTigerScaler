
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
    <svg width="63" height="91" viewBox="0 0 63 91" className="rounded-lg">
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
          {/* Card Back - Red and White Checkered Pattern */}
          <rect width="63" height="91" rx="8" fill="white" stroke="white" strokeWidth="3"/>
          
          {/* Inner border */}
          <rect x="6" y="6" width="51" height="79" rx="4" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
          
          {/* Checkered pattern */}
          <defs>
            <pattern id="checkerboard" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
              <rect width="6" height="6" fill="#dc2626"/>
              <rect x="6" y="0" width="6" height="6" fill="white"/>
              <rect x="0" y="6" width="6" height="6" fill="white"/>
              <rect x="6" y="6" width="6" height="6" fill="#dc2626"/>
            </pattern>
          </defs>
          <rect x="10" y="10" width="43" height="71" rx="3" fill="url(#checkerboard)"/>
          
          {/* Center overlay for subtle depth */}
          <rect x="10" y="10" width="43" height="71" rx="3" fill="white" opacity="0.1"/>
        </>
      )}
    </svg>
  );
}
