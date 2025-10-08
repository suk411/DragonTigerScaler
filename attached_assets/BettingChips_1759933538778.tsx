import React from "react";
import chip10 from "../assets/chip-10.png";
import chip50 from "../assets/chip-50.png";
import chip100 from "../assets/chip-100.png";
import chip500 from "../assets/chip-500.png";
import chip10k from "../assets/chip-10k.png";

interface BettingChipsProps {
  selectedChip: number | null;
  setSelectedChip: (chip: number | null) => void;
  vertical?: boolean;
}

export default function BettingChips({
  selectedChip,
  setSelectedChip,
  vertical,
}: BettingChipsProps) {
  const chips = [
    { id: 10, src: chip10, alt: "10" },
    { id: 50, src: chip50, alt: "50" },
    { id: 100, src: chip100, alt: "100" },
    { id: 500, src: chip500, alt: "500" },
    { id: 10000, src: chip10k, alt: "10k" },
  ];

  return (
    <div
      className={
        vertical
          ? "flex flex-row gap-2 items-center"
          : "flex gap-5 justify-center flex-wrap mb-2 w-full"
      }
    >
      {chips.map((chip) => (
        <img
          key={chip.id}
          src={chip.src}
          alt={chip.alt}
          className={`w-9 h-9 object-contain rounded-full transition duration-200 ease-in-out ${
            selectedChip === chip.id
              ? "border-2 border-yellow-400 shadow-[0_0_10px_2px_rgba(255,255,0,0.7)]"
              : ""
          }`}
          onClick={() => setSelectedChip(chip.id)}
        />
      ))}
    </div>
  );
}

