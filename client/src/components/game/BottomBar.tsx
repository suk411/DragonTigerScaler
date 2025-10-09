import BettingChips from "./BettingChips";
import avatarImg from "@/assets/avatar.png";

interface BottomBarProps {
  selectedChip: number | null;
  setSelectedChip: (chip: number | null) => void;
  balance: number;
}

export default function BottomBar({ selectedChip, setSelectedChip, balance }: BottomBarProps) {
  return (
    <div className="absolute bottom-0 z-30 flex items-center justify-between w-full px-6 py-4"
      style={{
        background: 'linear-gradient(to top, rgba(26,26,46,0.95), rgba(22,33,62,0.9))',
        borderTop: '2px solid rgba(147, 51, 234, 0.5)',
        boxShadow: '0 -4px 20px rgba(147, 51, 234, 0.3)'
      }}
    >
      {/* Left: Avatar and Balance Section */}
      <div className="flex items-center gap-4">
        <div 
          className="rounded-full overflow-hidden" 
          style={{
            border: '3px solid #c0c0c0',
            width: '70px',
            height: '70px',
            boxShadow: '0 0 15px rgba(192, 192, 192, 0.5)'
          }}
        >
          <img src={avatarImg} alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <div 
          className="text-white rounded-lg border-2 border-purple-500/50 select-none flex items-center justify-center text-lg font-bold px-6 py-2"
          style={{
            background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.4), rgba(59, 130, 246, 0.3))',
            boxShadow: '0 4px 10px rgba(147, 51, 234, 0.3)'
          }}
          data-testid="balance-display"
        >
          {balance.toLocaleString()}
        </div>
      </div>

      {/* Right: Betting Chips Section */}
      <div className="flex items-center">
        <BettingChips selectedChip={selectedChip} setSelectedChip={setSelectedChip} />
      </div>
    </div>
  );
}
