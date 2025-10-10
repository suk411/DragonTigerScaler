
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
    // Small delay to ensure DOM is ready
    const setupAnimation = () => {
      const bettingArea = document.getElementById(`${startBetType}-betting-area`);
      const newBadge = document.querySelector('[data-testid="trend-new-badge"]');
      
      if (bettingArea && newBadge) {
        const bettingRect = bettingArea.getBoundingClientRect();
        const badgeRect = newBadge.getBoundingClientRect();
        
        const startX = bettingRect.left + bettingRect.width / 2;
        const startY = bettingRect.top + bettingRect.height / 2;
        const endX = badgeRect.left + badgeRect.width / 2;
        const endY = badgeRect.top + badgeRect.height / 2;
        
        setPositions({ startX, startY, endX, endY });
      }
    };

    // Wait a tick for DOM to be ready
    requestAnimationFrame(setupAnimation);

    const timer = setTimeout(() => {
      setIsAnimating(false);
      onComplete();
    }, 2000);

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
            transform: translate(0, 0) scale(1.2) rotate(0deg);
          }
          20% {
            opacity: 1;
            transform: translate(${deltaX * 0.15}px, ${deltaY * 0.15 - 20}px) scale(1.6) rotate(72deg);
          }
          50% {
            opacity: 1;
            transform: translate(${deltaX * 0.5}px, ${deltaY * 0.5 - 30}px) scale(1.8) rotate(180deg);
          }
          80% {
            opacity: 1;
            transform: translate(${deltaX * 0.9}px, ${deltaY * 0.9}px) scale(1.2) rotate(288deg);
          }
          100% {
            opacity: 0.3;
            transform: translate(${deltaX}px, ${deltaY}px) scale(0.8) rotate(360deg);
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
          animation: starToTrend 2s cubic-bezier(0.34, 0.56, 0.64, 1) forwards;
        }
        
        .star-trail {
          animation: trailFade 0.5s ease-out forwards;
        }
      `}</style>
      
      {/* Trail particles */}
      <div
        className="fixed star-trail z-50"
        style={{
          top: `${positions.startY}px`,
          left: `${positions.startX}px`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: "none",
          animationDelay: '0.05s'
        }}
      >
        <Star 
          className={`w-6 h-6 ${starColorClass}`}
          fill="currentColor"
          style={{
            filter: `blur(2px) drop-shadow(0 0 15px ${starColor})`,
          }}
        />
      </div>
      
      <div
        className="fixed star-trail z-50"
        style={{
          top: `${positions.startY}px`,
          left: `${positions.startX}px`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: "none",
          animationDelay: '0.1s'
        }}
      >
        <Star 
          className={`w-6 h-6 ${starColorClass}`}
          fill="currentColor"
          style={{
            filter: `blur(3px) drop-shadow(0 0 20px ${starColor})`,
          }}
        />
      </div>
      
      {/* Main star */}
      <div
        className="fixed star-trend-particle z-50"
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
            className={`w-8 h-8 ${starColorClass}`}
            fill="currentColor"
            style={{
              filter: `drop-shadow(0 0 12px ${starColor})`,
            }}
          />
          {/* Glow ring */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${starColor}40 0%, transparent 70%)`,
              transform: 'scale(1.5)',
            }}
          />
        </div>
      </div>
    </>
  );
}
