import BettingChips from "./BettingChips";
import avatarImg from "@/assets/avatar.png";

interface BottomBarProps {
  selectedChip: number | null;
  setSelectedChip: (chip: number | null) => void;
  balance: number;
}

export default function BottomBar({ selectedChip, setSelectedChip, balance }: BottomBarProps) {
  return (
    <div className="absolute bottom-0 z-30 flex items-center justify-center w-full">
      <div 
        className="flex items-center  justify-between px-16 py-4 rounded-t-full"
        style={{
          width: '70%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderTop: '2px solid rgba(147, 51, 234, 0.5)',
          boxShadow: '0 -4px 20px rgba(147, 51, 234, 0.3)'
        }}
      >
        {/* Left: Avatar and Balance Section */}
        <div className="flex  grid grid-row gap-2">
          <div 
            className="rounded-full ml-4 overflow-hidden" 
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
            className="text-white rounded-full border-2 border-purple-500/50 select-none flex items-center justify-center text-sm font-bold px-6 py-1"
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
        <div 
          className="flex items-center rounded-2xl px-2 mr-4 py-"
          style={{
            background: 'linear-gradient(135deg, rgba(30, 30, 60, 0.8), rgba(20, 20, 40, 0.8))',
            border: '1px solid rgba(147, 51, 234, 0.3)',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
          }}
        >
          <BettingChips selectedChip={selectedChip} setSelectedChip={setSelectedChip} />
        </div>
      </div>
    </div>
  );
}
