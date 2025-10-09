
import { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface StarTrendAnimationProps {
  startBetType: "dragon" | "tiger" | "tie";
  onComplete: () => void;
}

export default function StarTrendAnimation({ startBetType, onComplete }: StarTrendAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(true);
  const [positions, setPositions] = useState({ startX: 0, startY: 0, endX: 0, endY: 0 });

  useEffect(() => {
    // Get the betting area element
    const bettingArea = document.getElementById(`${startBetType}-betting-area`);
    // Get the trend latest element
    const trendElement = document.getElementById('trend-latest');
    
    if (bettingArea && trendElement) {
      const bettingRect = bettingArea.getBoundingClientRect();
      const trendRect = trendElement.getBoundingClientRect();
      
      // Calculate center positions
      const startX = bettingRect.left + bettingRect.width / 2;
      const startY = bettingRect.top + bettingRect.height / 2;
      const endX = trendRect.left + trendRect.width / 2;
      const endY = trendRect.top + trendRect.height / 2;
      
      setPositions({ startX, startY, endX, endY });
    }

    const timer = setTimeout(() => {
      setIsAnimating(false);
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete, startBetType]);

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
            transform: translate(${(positions.endX - positions.startX) * 0.5}px, ${(positions.endY - positions.startY) * 0.5}px) scale(1.5) rotate(180deg);
          }
          100% {
            opacity: 0;
            transform: translate(${positions.endX - positions.startX}px, ${positions.endY - positions.startY}px) scale(0.5) rotate(360deg);
          }
        }
        .star-trend-particle {
          animation: starToTrend 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
      <div
        className="fixed star-trend-particle z-50"
        style={{
          top: `${positions.startY}px`,
          left: `${positions.startX}px`,
          transform: 'translate(-50%, -50%)',
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
