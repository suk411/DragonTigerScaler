import { useState } from "react";
import casinoTable from "@/assets/image.png";
import BettingAreaWithBets from "./BettingAreaWithBets";
import BottomBar from "./BottomBar";
import { useGameManagerContext } from "@/contexts/GameManagerContext";
import { Toaster } from "@/components/ui/toaster";

export default function DragonTigerGame() {
  const [selectedChip, setSelectedChip] = useState<number | null>(null);
  const [timer] = useState(15);
  const { balance } = useGameManagerContext();

  return (
    <>
      <Toaster />
      <style>
        {`
          .mobile-viewport {
            position: relative;
            width: 100%;
            height: 100%;
            background-image: url(${casinoTable});
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            overflow: hidden;
          }
        `}
      </style>

      <div className="mobile-viewport">
        <BettingAreaWithBets timer={timer} selectedChip={selectedChip} />
        <BottomBar selectedChip={selectedChip} setSelectedChip={setSelectedChip} balance={balance} />
      </div>
    </>
  );
}
