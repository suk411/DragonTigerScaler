import { MdCurrencyRupee } from "react-icons/md";

interface UserBalanceProps {
  balance: number;
}

export default function UserBalance({ balance }: UserBalanceProps) {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex items-center gap-2">
        <div className="text-[#ffe0da] rounded-lg bg-[#5f1e11] border-[#5b6612] border select-none p-1">
          <MdCurrencyRupee size={30} />
        </div>
        <div className="text-white rounded-lg border-2 border-[#5f5c07] select-none flex items-center justify-center text-lg font-bold px-10 py-2"
             style={{
               backgroundImage: `
                 repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 10px),
                 repeating-linear-gradient(-45deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 20px)
               `,
               backgroundSize: '17px 17px',
               backgroundColor: '#000000',
             }}
             data-testid="balance-display">
          {balance.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
