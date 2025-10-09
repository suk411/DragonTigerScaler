import BettingChips from "./BettingChips";
import avatarImg from "@/assets/avatar.png";

interface BottomBarProps {
  selectedChip: number | null;
  setSelectedChip: (chip: number | null) => void;
  balance: number;
}

export default function BottomBar({ selectedChip, setSelectedChip, balance }: BottomBarProps) {
  return (
    <div className="absolute bottom-0 z-30 flex items-end" style={{ width: '100%', left: "0", paddingBottom: '10px' }}>
      {/* Avatar and Balance Section */}
      <div className="flex flex-col items-center gap-2 ml-8">
        <div 
          className="rounded-full overflow-hidden" 
          style={{
            border: '3px solid #c0c0c0',
            width: '80px',
            height: '80px',
            boxShadow: '0 0 15px rgba(192, 192, 192, 0.5)'
          }}
        >
          <img src={avatarImg} alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <div 
          className="text-white rounded-lg border-2 border-[#5f5c07] select-none flex items-center justify-center text-lg font-bold px-6 py-1"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 10px),
              repeating-linear-gradient(-45deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 20px)
            `,
            backgroundSize: '17px 17px',
            backgroundColor: '#000000',
          }}
          data-testid="balance-display"
        >
          {balance.toLocaleString()}
        </div>
      </div>

      {/* Betting Chips Section */}
      <div className="flex-1 flex justify-center items-end pb-0">
        <div
          className="border-yellow-600 border-2 rounded-t-full flex flex-col items-center justify-start px-6 py-3"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 20px),
              repeating-linear-gradient(-45deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 20px)
            `,
            backgroundSize: '20px 20px',
            backgroundColor: '#000000',
          }}
        >
          <BettingChips selectedChip={selectedChip} setSelectedChip={setSelectedChip} />
        </div>
      </div>
    </div>
  );
}
