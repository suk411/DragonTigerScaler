import BettingChips from "./BettingChips";
import UserBalance from "./UserBalance";

interface BottomBarProps {
  selectedChip: number | null;
  setSelectedChip: (chip: number | null) => void;
  balance: number;
}

export default function BottomBar({ selectedChip, setSelectedChip, balance }: BottomBarProps) {
  return (
    <div className="absolute bottom-0  z-30 flex flex-col items-center" style={{ width: '70%',  right: "12%"}}>
      <div
        className="w-full max-w-full border-yellow-600 border-2 rounded-t-full flex flex-col items-center justify-start"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 20px),
            repeating-linear-gradient(-45deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 20px)
          `,
          backgroundSize: '20px 20px',
          backgroundColor: '#000000',
        }}
      >
        <div className="flex items-center justify-center" style={{ minWidth: 10 }}>
          <UserBalance balance={balance} />
        </div>
        <div>
          <BettingChips selectedChip={selectedChip} setSelectedChip={setSelectedChip} />
        </div>
      </div>
    </div>
  );
}
