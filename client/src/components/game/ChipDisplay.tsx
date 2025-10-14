import chip10 from "@/assets/chip-10.png";
import chip50 from "@/assets/chip-50.png";
import chip100 from "@/assets/chip-100.png";
import chip500 from "@/assets/chip-500.png";
import chip10k from "@/assets/chip-10k.png";

interface ChipDisplayProps {
  amount: number;
  betType: "dragon" | "tiger" | "tie";
}

const CHIP_VALUES = [
  { value: 10000, image: chip10k },
  { value: 500, image: chip500 },
  { value: 100, image: chip100 },
  { value: 50, image: chip50 },
  { value: 10, image: chip10 },
];

export default function ChipDisplay({ amount, betType }: ChipDisplayProps) {
  if (amount <= 0) return null;

  const chips: { value: number; image: string; count: number }[] = [];
  let remaining = amount;

  for (const chip of CHIP_VALUES) {
    if (remaining >= chip.value) {
      const count = Math.min(Math.floor(remaining / chip.value), 5);
      if (count > 0) {
        chips.push({ value: chip.value, image: chip.image, count });
        remaining -= count * chip.value;
      }
    }
  }

  const maxChipsToShow = 8;
  const displayChips = chips.slice(0, maxChipsToShow);

  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-end justify-center gap-0.5 pointer-events-none z-30">
      <style>{`
        @keyframes chipAppear {
          0% {
            opacity: 0;
            transform: translateY(-20px) scale(0.5) rotate(0deg);
          }
          60% {
            opacity: 1;
            transform: translateY(0) scale(1.1) rotate(5deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
          }
        }
        .chip-stack {
          animation: chipAppear 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
        }
      `}</style>
      
      {displayChips.map((chip, chipIndex) => (
        <div key={`${betType}-${chip.value}-${chipIndex}`} className="relative flex flex-col-reverse items-center">
          {Array.from({ length: chip.count }).map((_, stackIndex) => (
            <img
              key={`${betType}-${chip.value}-${chipIndex}-${stackIndex}`}
              src={chip.image}
              alt={`Chip ${chip.value}`}
              className="chip-stack"
              style={{
                width: "24px",
                height: "24px",
                marginTop: stackIndex > 0 ? "-18px" : "0",
                animationDelay: `${(chipIndex * chip.count + stackIndex) * 0.05}s`,
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
