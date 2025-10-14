import { useEffect, useState } from "react";
import chip10 from "@/assets/chip-10.png";
import chip50 from "@/assets/chip-50.png";
import chip100 from "@/assets/chip-100.png";
import chip500 from "@/assets/chip-500.png";
import chip10k from "@/assets/chip-10k.png";

interface CoinAnimationProps {
  amount: number;
  targetId: string;
  onComplete: () => void;
  startPosition?: { x: number; y: number };
}

const CHIP_IMAGES = {
  10: chip10,
  50: chip50,
  100: chip100,
  500: chip500,
  10000: chip10k,
};

export default function CoinAnimation({ amount, targetId, onComplete, startPosition }: CoinAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(true);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
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

    if (startPosition) {
      setStartPos(startPosition);
    } else {
      setStartPos({ x: window.innerWidth / 2, y: window.innerHeight - 80 });
    }

    const timer = setTimeout(() => {
      setIsAnimating(false);
      onComplete();
    }, 600);

    return () => clearTimeout(timer);
  }, [onComplete, targetId, startPosition]);

  if (!isAnimating) return null;

  let chipSrc = chip10;
  if (amount >= 10000) chipSrc = chip10k;
  else if (amount >= 500) chipSrc = chip500;
  else if (amount >= 100) chipSrc = chip100;
  else if (amount >= 50) chipSrc = chip50;

  const deltaX = targetPosition.x - startPos.x;
  const deltaY = targetPosition.y - startPos.y;

  return (
    <>
      <style>{`
        @keyframes coinFly60fps {
          0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: translate(calc(var(--dx) * 0.5), calc(var(--dy) * 0.5)) scale(1.3) rotate(180deg);
            opacity: 0.9;
          }
          100% {
            transform: translate(var(--dx), var(--dy)) scale(0.6) rotate(360deg);
            opacity: 0;
          }
        }
        .coin-flying-smooth {
          position: fixed;
          z-index: 1000;
          pointer-events: none;
          animation: coinFly60fps 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          will-change: transform, opacity;
        }
      `}</style>
      <img
        src={chipSrc}
        alt="Coin"
        className="coin-flying-smooth"
        style={{
          width: "28px",
          height: "28px",
          left: `${startPos.x}px`,
          top: `${startPos.y}px`,
          transform: "translate(-50%, -50%)",
          "--dx": `${deltaX}px`,
          "--dy": `${deltaY}px`,
        } as React.CSSProperties}
      />
    </>
  );
}
