
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
    <div className="flex flex-col gap-3 h-full justify-between">
      <div 
        className="text-center text-yellow-400 font-bold text-sm px-3 py-1 rounded-t-lg"
        style={{
          background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.6), rgba(59, 130, 246, 0.4))',
          border: '2px solid rgba(234, 179, 8, 0.6)',
          borderBottom: '1px solid rgba(234, 179, 8, 0.3)'
        }}
      >
        🏆 WINNERS
      </div>
      
      {displayWinners.map((winner, index) => (
        <div
          key={winner.id}
          className="flex items-center gap-2 px-2 py-2 rounded-lg"
          style={{
            background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.4), rgba(59, 130, 246, 0.3))',
            border: '2px solid rgba(234, 179, 8, 0.5)',
            boxShadow: '0 2px 8px rgba(234, 179, 8, 0.2)'
          }}
        >
          {winner.avatar ? (
            <img 
              src={winner.avatar} 
              alt={winner.username}
              className="w-10 h-10 rounded-full border-2 border-yellow-400"
            />
          ) : (
            <div className="w-10 h-10 rounded-full border-2 border-gray-600 bg-gray-800"></div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="text-white text-xs font-semibold truncate">
              {winner.username}
            </div>
            <div className="text-yellow-400 text-xs font-bold">
              {winner.amount > 0 ? `₹${winner.amount.toLocaleString()}` : '---'}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
