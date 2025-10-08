import React, { useEffect, useState } from "react";
import chip10 from "../assets/chip-10.png";
import chip50 from "../assets/chip-50.png";
import chip100 from "../assets/chip-100.png";
import chip500 from "../assets/chip-500.png";
import chip10k from "../assets/chip-10k.png";

interface CoinAnimationProps {
  amount: number;
  targetId: string;
  onComplete: () => void;
}

const CHIP_IMAGES = {
  10: chip10,
  50: chip50,
  100: chip100,
  500: chip500,
  10000: chip10k,
};

export default function CoinAnimation({ amount, targetId, onComplete }: CoinAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(true);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Map targetId to actual betting area elements
    const targetMap: Record<string, string> = {
      'dragon': 'dragon-betting-area',
      'tiger': 'tiger-betting-area',
      'tie': 'tie-betting-area'
    };
    
    const actualTargetId = targetMap[targetId] || targetId;
    const targetElement = document.getElementById(actualTargetId);
    
    if (targetElement) {
      const targetRect = targetElement.getBoundingClientRect();
      const centerX = targetRect.left + targetRect.width / 2;
      const centerY = targetRect.top + targetRect.height / 2;
      setTargetPosition({ x: centerX, y: centerY });
    }

    const timer = setTimeout(() => {
      setIsAnimating(false);
      onComplete();
    }, 800);

    return () => clearTimeout(timer);
  }, [onComplete, targetId]);

  if (!isAnimating) return null;

  // Select appropriate chip image based on amount
  let chipSrc = chip10;
  if (amount >= 10000) chipSrc = chip10k;
  else if (amount >= 500) chipSrc = chip500;
  else if (amount >= 100) chipSrc = chip100;
  else if (amount >= 50) chipSrc = chip50;

  return (
    <>
      <style>{`
        @keyframes coinFly {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(var(--tx), var(--ty)) scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) scale(0.5);
            opacity: 0;
          }
        }
        .coin-flying {
          position: fixed;
          z-index: 1000;
          pointer-events: none;
          animation: coinFly 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
      <img
        src={chipSrc}
        alt="Coin"
        className="coin-flying"
        style={{
          width: "24px",
          height: "24px",
          left: "50%",
          bottom: "80px",
          transform: "translateX(-50%)",
          "--tx": `${targetPosition.x - window.innerWidth / 2}px`,
          "--ty": `${targetPosition.y - window.innerHeight + 80}px`,
        } as React.CSSProperties}
      />
    </>
  );
}
