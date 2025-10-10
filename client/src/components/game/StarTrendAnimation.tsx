
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
    const setupAnimation = () => {
      const bettingArea = document.getElementById(`${startBetType}-betting-area`);
      const trendContainer = document.querySelector('[data-testid="trend-container"]');
      
      if (bettingArea && trendContainer) {
        const bettingRect = bettingArea.getBoundingClientRect();
        const trendRect = trendContainer.getBoundingClientRect();
        
        // Start position: center of betting area
        const startX = bettingRect.left + bettingRect.width / 2;
        const startY = bettingRect.top + bettingRect.height / 2;
        
        // End position: right edge of trend container (where NEW badge is)
        const endX = trendRect.right - 30;
        const endY = trendRect.top + trendRect.height / 2;
        
        setPositions({ startX, startY, endX, endY });
      }
    };

    requestAnimationFrame(setupAnimation);

    const timer = setTimeout(() => {
      setIsAnimating(false);
      onComplete();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete, startBetType]);

  if (!isAnimating) return null;

  const starColor = startBetType === 'dragon' ? '#60a5fa' : 
                    startBetType === 'tiger' ? '#fb923c' : '#4ade80';
  
  const starColorClass = startBetType === 'dragon' ? 'text-blue-400' : 
                         startBetType === 'tiger' ? 'text-orange-400' : 'text-green-400';

  const deltaX = positions.endX - positions.startX;
  const deltaY = positions.endY - positions.startY;

  return (
    <>
      <style>{`
        @keyframes starToTrend {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1.5) rotate(0deg);
          }
          20% {
            opacity: 1;
            transform: translate(${deltaX * 0.2}px, ${deltaY * 0.2 - 20}px) scale(1.7) rotate(72deg);
          }
          40% {
            opacity: 1;
            transform: translate(${deltaX * 0.4}px, ${deltaY * 0.4 - 30}px) scale(1.9) rotate(144deg);
          }
          60% {
            opacity: 1;
            transform: translate(${deltaX * 0.6}px, ${deltaY * 0.6 - 20}px) scale(1.6) rotate(216deg);
          }
          80% {
            opacity: 0.9;
            transform: translate(${deltaX * 0.85}px, ${deltaY * 0.85}px) scale(1.2) rotate(288deg);
          }
          95% {
            opacity: 0.5;
            transform: translate(${deltaX * 0.98}px, ${deltaY * 0.98}px) scale(0.8) rotate(342deg);
          }
          100% {
            opacity: 0;
            transform: translate(${deltaX}px, ${deltaY}px) scale(0.5) rotate(360deg);
          }
        }
        
        @keyframes trailFade {
          0% {
            opacity: 0.6;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.3);
          }
        }
        
        .star-trend-particle {
          animation: starToTrend 1.5s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
          will-change: transform, opacity;
        }
        
        .star-trail {
          animation: trailFade 0.6s ease-out forwards;
          will-change: transform, opacity;
        }
      `}</style>
      
      {/* Trail particles */}
      <div
        className="fixed star-trail z-[100]"
        style={{
          top: `${positions.startY}px`,
          left: `${positions.startX}px`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: "none",
          animationDelay: '0.08s'
        }}
      >
        <Star 
          className={`w-7 h-7 ${starColorClass}`}
          fill="currentColor"
          style={{
            filter: `blur(3px) drop-shadow(0 0 18px ${starColor})`,
          }}
        />
      </div>
      
      <div
        className="fixed star-trail z-[100]"
        style={{
          top: `${positions.startY}px`,
          left: `${positions.startX}px`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: "none",
          animationDelay: '0.15s'
        }}
      >
        <Star 
          className={`w-7 h-7 ${starColorClass}`}
          fill="currentColor"
          style={{
            filter: `blur(4px) drop-shadow(0 0 22px ${starColor})`,
          }}
        />
      </div>
      
      {/* Main star */}
      <div
        className="fixed star-trend-particle z-[100]"
        style={{
          top: `${positions.startY}px`,
          left: `${positions.startX}px`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: "none",
        }}
        data-testid={`star-animation-${startBetType}`}
      >
        <div className="relative">
          <Star 
            className={`w-10 h-10 ${starColorClass}`}
            fill="currentColor"
            style={{
              filter: `drop-shadow(0 0 15px ${starColor}) drop-shadow(0 0 25px ${starColor})`,
            }}
          />
          {/* Glow ring */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${starColor}50 0%, transparent 70%)`,
              transform: 'scale(2)',
            }}
          />
        </div>
      </div>
    </>
  );
}
