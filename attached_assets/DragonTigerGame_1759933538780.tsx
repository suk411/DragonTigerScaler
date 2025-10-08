import React, { useState } from "react";
import casinoTable from "../assets/image.png";
import TopBar from "./TopBar";
import BettingAreaWithBets from "./BettingAreaWithBets";
import BottomBar from "./BottomBar";
import { useGameManager } from "@/hooks/useGameManager";
import { Toaster } from "@/components/ui/toaster";

export default function DragonTigerGame() {
  const [selectedChip, setSelectedChip] = useState<number | null>(null);
  const [timer] = useState(15);
  const { balance } = useGameManager();

  return (
    <>
      <Toaster />
      <style>
        {`
          html, body, #root {
             height: 100%;
             margin: 0;
             padding: 0;
             background: #000;
             overflow: hidden;
           }
          .game-container {
            position: relative;
            width: 100%;
            height: 100vh;
            max-width: 100vw;
            background: #000;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .mobile-viewport {
            position: relative;
            width: 100%;
            height: 100%;
            minWidth: 329px; 
            max-width: 367px;
            aspect-ratio: 9/18;
            background-image: url(${casinoTable});
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            overflow: hidden;
          }
          @media (min-width: 768px) {
            .game-container {
              padding: 20px;
            }
            .mobile-viewport {
              height: min(100vh - 40px, calc((367px) * 2));
              width: min(367px, calc((100vh - 40px) / 2));
              margin: 0 auto;
            }
          }
          .game-element {
            position: absolute;
          }
        `}
      </style>

      {/* Home button fixed at top left, outside gameboard */}
      <div className="fixed top-4 left-4 z-50">
        <TopBar />
      </div>

      {/* Main gameboard centered */}
      <div className="game-container" style={{  justifyContent: 'center', alignItems: 'center', display: 'flex', minHeight: '100vh', minWidth: '329px' }}>
        <div className="mobile-viewport" style={{  
          margin: '0 auto', position: 'relative' }}>

          
          {/* Betting area and animations */}
          <BettingAreaWithBets timer={timer} selectedChip={selectedChip} />
        </div>
        
      </div>

      {/* Chips and user balance fixed at bottom, outside gameboard */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center">
        <BottomBar selectedChip={selectedChip} setSelectedChip={setSelectedChip} balance={balance} />
      </div>
    </>
  );
}
