
interface Winner {
  id: string;
  avatar: string;
  username: string;
  amount: number;
}

interface WinnersSectionProps {
  winners: Winner[];
}

export default function WinnersSection({ winners }: WinnersSectionProps) {
  // Show top 3 winners or fill with empty slots
  const displayWinners = [...winners.slice(0, 3)];
  
  while (displayWinners.length < 3) {
    displayWinners.push({
      id: `empty-${displayWinners.length}`,
      avatar: '',
      username: '---',
      amount: 0
    });
  }

  return (
    <div className="flex flex-col gap-4 h-full justify-start pt-2">
      {displayWinners.map((winner, index) => (
        <div
          key={winner.id}
          className="flex flex-col items-center gap-1 relative"
        >
          {/* Show WINNERS heading only on first avatar */}
          {index === 0 && (
            <div 
              className="absolute -top-6 text-center text-yellow-400 font-bold text-xs px-2 py-0.5 rounded"
              style={{
                background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.8), rgba(59, 130, 246, 0.6))',
                border: '2px solid rgba(234, 179, 8, 0.6)',
              }}
            >
              🏆 WINNERS
            </div>
          )}
          
          {/* Avatar with border only */}
          <img 
            src={winner.avatar} 
            alt={`Winner ${index + 1}`}
            className="w-12 h-12 rounded-full border-2 border-yellow-400 object-cover bg-gray-800"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <div className="w-12 h-12 rounded-full border-2 border-gray-600 bg-gray-800 flex items-center justify-center" style={{ display: 'none' }}>
            <span className="text-gray-500 text-xs">👤</span>
          </div>
          
          {/* Balance below avatar */}
          <div className="text-yellow-400 text-xs font-bold">
            {winner.amount > 0 ? `₹${winner.amount.toLocaleString()}` : '---'}
          </div>
        </div>
      ))}
    </div>
  );
}
