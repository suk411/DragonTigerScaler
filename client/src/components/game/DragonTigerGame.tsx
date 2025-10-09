import { useState } from "react";
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
            background: linear-gradient(to bottom, #1a1a2e 0%, #16213e 30%, #0f3460 70%, #533483 100%);
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
