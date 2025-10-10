import avatar1 from '../../assets/avatar1.png';
import avatar2 from '../../assets/avatar2.png';
import avatar3 from '../../assets/avatar3.png';
import avatar4 from '../../assets/avatar4.png';
import avatar5 from '../../assets/avatar5.png';
import avatar6 from '../../assets/avatar6.png';

interface LuckyPlayer {
  id: string;
  avatar: string;
  username: string;
  amount: number;
}

interface LuckySectionProps {
  luckyPlayers: LuckyPlayer[];
}

const defaultAvatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

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
          
          {/* Avatar - use provided image or default avatar */}
          <img 
            src={player.avatar || defaultAvatars[index % defaultAvatars.length]} 
            alt={`Lucky ${index + 1}`}
            className="w-12 h-12 rounded-full border-2 border-yellow-400 object-cover"
          />
          
          {/* Balance below avatar */}
          <div className="text-green-400 text-xs font-bold">
            {player.amount > 0 ? `${player.amount.toLocaleString()}` : '---'}
          </div>
        </div>
      ))}
    </div>
  );
}
