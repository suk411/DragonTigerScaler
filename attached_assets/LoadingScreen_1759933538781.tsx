import { useEffect, useState } from "react";
import casinoTable from "../assets/image.png";
import dragonBody from "../assets/dragon-body.png";
import tigerBody from "../assets/tiger-body.png";
import cardBack from "../assets/cards/card-back.svg";

// Import all card SVGs - Hearts
import aceHearts from "../assets/cards/ace-hearts.svg";
import twoHearts from "../assets/cards/2-hearts.svg";
import threeHearts from "../assets/cards/3-hearts.svg";
import fourHearts from "../assets/cards/4-hearts.svg";
import fiveHearts from "../assets/cards/5-hearts.svg";
import sixHearts from "../assets/cards/6-hearts.svg";
import sevenHearts from "../assets/cards/7-hearts.svg";
import eightHearts from "../assets/cards/8-hearts.svg";
import nineHearts from "../assets/cards/9-hearts.svg";
import tenHearts from "../assets/cards/10-hearts.svg";
import jackHearts from "../assets/cards/jack-hearts.svg";
import queenHearts from "../assets/cards/queen-hearts.svg";
import kingHearts from "../assets/cards/king-hearts.svg";

// Diamonds
import aceDiamonds from "../assets/cards/ace-diamonds.svg";
import twoDiamonds from "../assets/cards/2-diamonds.svg";
import threeDiamonds from "../assets/cards/3-diamonds.svg";
import fourDiamonds from "../assets/cards/4-diamonds.svg";
import fiveDiamonds from "../assets/cards/5-diamonds.svg";
import sixDiamonds from "../assets/cards/6-diamonds.svg";
import sevenDiamonds from "../assets/cards/7-diamonds.svg";
import eightDiamonds from "../assets/cards/8-diamonds.svg";
import nineDiamonds from "../assets/cards/9-diamonds.svg";
import tenDiamonds from "../assets/cards/10-diamonds.svg";
import jackDiamonds from "../assets/cards/jack-diamonds.svg";
import queenDiamonds from "../assets/cards/queen-diamonds.svg";
import kingDiamonds from "../assets/cards/king-diamonds.svg";

// Clubs
import aceClubs from "../assets/cards/ace-clubs.svg";
import twoClubs from "../assets/cards/2-clubs.svg";
import threeClubs from "../assets/cards/3-clubs.svg";
import fourClubs from "../assets/cards/4-clubs.svg";
import fiveClubs from "../assets/cards/5-clubs.svg";
import sixClubs from "../assets/cards/6-clubs.svg";
import sevenClubs from "../assets/cards/7-clubs.svg";
import eightClubs from "../assets/cards/8-clubs.svg";
import nineClubs from "../assets/cards/9-clubs.svg";
import tenClubs from "../assets/cards/10-clubs.svg";
import jackClubs from "../assets/cards/jack-clubs.svg";
import queenClubs from "../assets/cards/queen-clubs.svg";
import kingClubs from "../assets/cards/king-clubs.svg";

// Spades
import aceSpades from "../assets/cards/ace-spades.svg";
import twoSpades from "../assets/cards/2-spades.svg";
import threeSpades from "../assets/cards/3-spades.svg";
import fourSpades from "../assets/cards/4-spades.svg";
import fiveSpades from "../assets/cards/5-spades.svg";
import sixSpades from "../assets/cards/6-spades.svg";
import sevenSpades from "../assets/cards/7-spades.svg";
import eightSpades from "../assets/cards/8-spades.svg";
import nineSpades from "../assets/cards/9-spades.svg";
import tenSpades from "../assets/cards/10-spades.svg";
import jackSpades from "../assets/cards/jack-spades.svg";
import queenSpades from "../assets/cards/queen-spades.svg";
import kingSpades from "../assets/cards/king-spades.svg";

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

export default function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    const imagesToPreload = [
      casinoTable, dragonBody, tigerBody, cardBack,
      // All 52 cards
      aceHearts, twoHearts, threeHearts, fourHearts, fiveHearts, sixHearts, sevenHearts, eightHearts, nineHearts, tenHearts, jackHearts, queenHearts, kingHearts,
      aceDiamonds, twoDiamonds, threeDiamonds, fourDiamonds, fiveDiamonds, sixDiamonds, sevenDiamonds, eightDiamonds, nineDiamonds, tenDiamonds, jackDiamonds, queenDiamonds, kingDiamonds,
      aceClubs, twoClubs, threeClubs, fourClubs, fiveClubs, sixClubs, sevenClubs, eightClubs, nineClubs, tenClubs, jackClubs, queenClubs, kingClubs,
      aceSpades, twoSpades, threeSpades, fourSpades, fiveSpades, sixSpades, sevenSpades, eightSpades, nineSpades, tenSpades, jackSpades, queenSpades, kingSpades
    ];
    let loadedCount = 0;
    let serverConnected = false;

    const preloadImage = (src: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          const imageProgress = Math.floor((loadedCount / imagesToPreload.length) * 90);
          setProgress(imageProgress);
          resolve(src);
        };
        img.onerror = reject;
        img.src = src;
      });
    };

    // Test server connection
    const testConnection = async () => {
      try {
        const response = await fetch('/api/game-state');
        if (response.ok) {
          serverConnected = true;
          setProgress(prev => Math.max(prev, 95));
        }
      } catch (error) {
        console.error("Server connection test failed:", error);
      }
    };

    Promise.all([
      ...imagesToPreload.map(preloadImage),
      testConnection()
    ])
      .then(() => {
        setProgress(100);
        setAssetsLoaded(true);
        setTimeout(() => onLoadComplete(), 500);
      })
      .catch((error) => {
        console.error("Error loading assets:", error);
        setTimeout(() => onLoadComplete(), 1000);
      });
  }, [onLoadComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 animate-pulse">
            Dragon Tiger
          </h1>
        </div>

        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-gray-400 text-sm">
          {assetsLoaded ? "Ready!" : `Loading assets... ${progress}%`}
        </p>
      </div>
    </div>
  );
}
