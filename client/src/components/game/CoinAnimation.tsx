import { useEffect, useState } from "react";
import chip10 from "@/assets/chip-10.png";
import chip50 from "@/assets/chip-50.png";
import chip100 from "@/assets/chip-100.png";
import chip500 from "@/assets/chip-500.png";
import chip10k from "@/assets/chip-10k.png";

interface CoinAnimationProps {
  amount: number;
  targetId: string;
  startPosition: { x: number; y: number }; // Now expects percentage values (0-100)
  onComplete: () => void;
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
    const targetElement = document.getElementById(`${targetId}-betting-area`);
    const gameContainer = document.querySelector('.mobile-viewport');
    if (!targetElement || !gameContainer) return;

    const targetRect = targetElement.getBoundingClientRect();
    const containerRect = gameContainer.getBoundingClientRect();

    // Convert target to percentage position
    const endX = ((targetRect.left + targetRect.width / 2 - containerRect.left) / containerRect.width) * 100;
    const endY = ((targetRect.top + targetRect.height / 2 - containerRect.top) / containerRect.height) * 100;
    setTargetPosition({ x: endX, y: endY });

    setStartPos(startPosition);

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
          left: `${startPos.x}%`,
          top: `${startPos.y}%`,
          transform: "translate(-50%, -50%)",
          "--dx": `${deltaX}%`,
          "--dy": `${deltaY}%`,
        } as React.CSSProperties}
      />
    </>
  );
}