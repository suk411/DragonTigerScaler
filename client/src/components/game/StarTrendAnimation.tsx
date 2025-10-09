import { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface StarTrendAnimationProps {
  startBetType: "dragon" | "tiger" | "tie";
  onComplete: () => void;
}

export default function StarTrendAnimation({ startBetType, onComplete }: StarTrendAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(true);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Calculate target position from trend-latest element
    const trendElement = document.getElementById('trend-latest');
    if (trendElement) {
      const rect = trendElement.getBoundingClientRect();
      const startRect = document.getElementById(`${startBetType}-betting-area`)?.getBoundingClientRect();
      if (startRect) {
        setTargetPosition({
          x: rect.left + rect.width / 2 - startRect.left - startRect.width / 2,
          y: rect.top + rect.height / 2 - startRect.top - startRect.height / 2
        });
      }
    }

    const timer = setTimeout(() => {
      setIsAnimating(false);
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete, startBetType]);

  // Get starting position based on bet type
  const getStartPosition = () => {
    switch (startBetType) {
      case "dragon":
        return { bottom: "39%", left: "33%" }; // Dragon betting area center
      case "tiger":
        return { bottom: "39%", right: "33%" }; // Tiger betting area center
      case "tie":
        return { bottom: "39%", left: "50%", transform: "translateX(-50%)" }; // Tie betting area center
      default:
        return { bottom: "39%", left: "50%" };
    }
  };

  const startPos = getStartPosition();

  if (!isAnimating) return null;

  return (
    <>
      <style>{`
        @keyframes starToTrend {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: translate(${targetPosition.x * 0.5}px, ${targetPosition.y * 0.5}px) scale(1.5) rotate(180deg);
          }
          100% {
            opacity: 0;
            transform: translate(${targetPosition.x}px, ${targetPosition.y}px) scale(0.5) rotate(360deg);
          }
        }
        .star-trend-particle {
          animation: starToTrend 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
      <div
        className="absolute star-trend-particle z-50"
        style={{
          ...startPos,
          pointerEvents: "none",
        }}
      >
        <div className="relative">
          <Star 
            className={`w-8 h-8 ${
              startBetType === 'dragon' ? 'text-blue-400' : 
              startBetType === 'tiger' ? 'text-orange-400' : 
              'text-green-400'
            }`}
            fill="currentColor"
            style={{
              filter: `drop-shadow(0 0 10px ${
                startBetType === 'dragon' ? '#60a5fa' : 
                startBetType === 'tiger' ? '#fb923c' : 
                '#4ade80'
              })`,
            }}
          />
        </div>
      </div>
    </>
  );
}
