
interface LuckyPlayer {
  id: string;
  avatar: string;
  username: string;
  amount: number;
}

interface LuckySectionProps {
  luckyPlayers: LuckyPlayer[];
}

export default function LuckySection({ luckyPlayers }: LuckySectionProps) {
  // Show top 3 lucky players or fill with empty slots
  const displayPlayers = [...luckyPlayers.slice(0, 3)];
  
  while (displayPlayers.length < 3) {
    displayPlayers.push({
      id: `empty-${displayPlayers.length}`,
      avatar: '',
      username: '---',
      amount: 0
    });
  }

  return (
    <div className="flex flex-col gap-4 h-full justify-start pt-2">
      {displayPlayers.map((player, index) => (
        <div
          key={player.id}
          className="flex flex-col items-center gap-1 relative"
        >
          {/* Show LUCKY heading only on first avatar */}
          {index === 0 && (
            <div 
              className="absolute -top-6 text-center text-yellow-400 font-bold text-xs px-2 py-0.5 rounded"
              style={{
                background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.8), rgba(59, 130, 246, 0.6))',
                border: '2px solid rgba(234, 179, 8, 0.6)',
              }}
            >
              🍀 LUCKY
            </div>
          )}
          
          {/* Avatar with border only */}
          {player.avatar ? (
            <img 
              src={player.avatar} 
              alt={`Lucky ${index + 1}`}
              className="w-12 h-12 rounded-full border-2 border-yellow-400 object-cover"
              onError={(e) => {
                // Fallback if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                if (target.nextElementSibling) {
                  (target.nextElementSibling as HTMLElement).style.display = 'flex';
                }
              }}
            />
          ) : null}
          
          {/* Fallback avatar placeholder */}
          <div 
            className="w-12 h-12 rounded-full border-2 border-gray-600 bg-gray-800 flex items-center justify-center"
            style={{ display: player.avatar ? 'none' : 'flex' }}
          >
            <span className="text-gray-500 text-xs">👤</span>
          </div>
          
          {/* Balance below avatar */}
          <div className="text-green-400 text-xs font-bold">
            {player.amount > 0 ? `₹${player.amount.toLocaleString()}` : '---'}
          </div>
        </div>
      ))}
    </div>
  );
}
