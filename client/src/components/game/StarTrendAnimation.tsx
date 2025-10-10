
import { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface StarTrendAnimationProps {
  startBetType: "dragon" | "tiger" | "tie";
  onComplete: () => void;
}

export default function StarTrendAnimation({ startBetType, onComplete }: StarTrendAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(true);
  const [positions, setPositions] = useState({ 
    startX: 0, startY: 0, 
    startXPercent: 0, startYPercent: 0,
    endXPercent: 0, endYPercent: 0 
  });

  useEffect(() => {
    const setupAnimation = () => {
      const gameContainer = document.querySelector('.relative.w-full.h-full') as HTMLElement;
      
      if (gameContainer) {
        const containerRect = gameContainer.getBoundingClientRect();
        
        // Start positions - use viewport coordinates for initial placement
        let startX, startY, startXPercent, startYPercent;
        
        if (startBetType === 'tie') {
          startXPercent = 52; // 52% from left
          startYPercent = 60; // 60% from top
        } else if (startBetType === 'dragon') {
          startXPercent = 34; // 34% from left
          startYPercent = 60; // 60% from top
        } else { // tiger
          startXPercent = 70; // 70% from left
          startYPercent = 60; // 60% from top
        }
        
        // Calculate viewport start position
        startX = containerRect.left + (containerRect.width * (startXPercent / 100));
        startY = containerRect.top + (containerRect.height * (startYPercent / 100));
        
        // End position as percentage (canvas scalar) - trend display location
        const endXPercent = 66; // 66% from left
        const endYPercent = 36; // 36% from top
        
        setPositions({ 
          startX, 
          startY, 
          startXPercent, 
          startYPercent,
          endXPercent, 
          endYPercent 
        });
      }
    };

    requestAnimationFrame(setupAnimation);

    const timer = setTimeout(() => {
      setIsAnimating(false);
      onComplete();
    }, 2500); // Reduced from 3000ms for smoother flow

    return () => clearTimeout(timer);
  }, [onComplete, startBetType]);

  if (!isAnimating) return null;

  const starColor = startBetType === 'dragon' ? '#60a5fa' : 
                    startBetType === 'tiger' ? '#fb923c' : '#4ade80';
  
  const starColorClass = startBetType === 'dragon' ? 'text-blue-400' : 
                         startBetType === 'tiger' ? 'text-orange-400' : 'text-green-400';

  // Calculate percentage-based delta for canvas scalar positioning
  const deltaXPercent = positions.endXPercent - positions.startXPercent;
  const deltaYPercent = positions.endYPercent - positions.startYPercent;

  return (
    <>
      <style>{`
        @keyframes starToTrend {
          0% {
            opacity: 0;
            left: ${positions.startXPercent}%;
            top: ${positions.startYPercent}%;
            transform: translate(-50%, -50%) scale(0.5) rotate(0deg);
          }
          15% {
            opacity: 1;
            left: calc(${positions.startXPercent}% + ${deltaXPercent * 0.15}%);
            top: calc(${positions.startYPercent}% + ${deltaYPercent * 0.15}% - 3%);
            transform: translate(-50%, -50%) scale(1.8) rotate(54deg);
          }
          30% {
            opacity: 1;
            left: calc(${positions.startXPercent}% + ${deltaXPercent * 0.3}%);
            top: calc(${positions.startYPercent}% + ${deltaYPercent * 0.3}% - 4%);
            transform: translate(-50%, -50%) scale(2) rotate(108deg);
          }
          50% {
            opacity: 1;
            left: calc(${positions.startXPercent}% + ${deltaXPercent * 0.5}%);
            top: calc(${positions.startYPercent}% + ${deltaYPercent * 0.5}% - 3%);
            transform: translate(-50%, -50%) scale(1.8) rotate(180deg);
          }
          70% {
            opacity: 1;
            left: calc(${positions.startXPercent}% + ${deltaXPercent * 0.75}%);
            top: calc(${positions.startYPercent}% + ${deltaYPercent * 0.75}% - 1%);
            transform: translate(-50%, -50%) scale(1.4) rotate(252deg);
          }
          85% {
            opacity: 0.9;
            left: calc(${positions.startXPercent}% + ${deltaXPercent * 0.92}%);
            top: calc(${positions.startYPercent}% + ${deltaYPercent * 0.92}%);
            transform: translate(-50%, -50%) scale(1) rotate(306deg);
          }
          95% {
            opacity: 0.5;
            left: calc(${positions.startXPercent}% + ${deltaXPercent * 0.98}%);
            top: calc(${positions.startYPercent}% + ${deltaYPercent * 0.98}%);
            transform: translate(-50%, -50%) scale(0.6) rotate(342deg);
          }
          100% {
            opacity: 0;
            left: ${positions.endXPercent}%;
            top: ${positions.endYPercent}%;
            transform: translate(-50%, -50%) scale(0.3) rotate(360deg);
          }
        }
        
        @keyframes trailFade {
          0% {
            opacity: 0.7;
            left: ${positions.startXPercent}%;
            top: ${positions.startYPercent}%;
            transform: translate(-50%, -50%) scale(1.2);
          }
          100% {
            opacity: 0;
            left: calc(${positions.startXPercent}% + ${deltaXPercent * 0.3}%);
            top: calc(${positions.startYPercent}% + ${deltaYPercent * 0.3}%);
            transform: translate(-50%, -50%) scale(0.4);
          }
        }
        
        .star-trend-particle {
          animation: starToTrend 2.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
          will-change: left, top, transform, opacity;
        }
        
        .star-trail {
          animation: trailFade 1.5s ease-out forwards;
          will-change: left, top, transform, opacity;
        }
      `}</style>
      
      {/* Trail particles with improved smoothness */}
      <div
        className="absolute star-trail z-[100]"
        style={{
          pointerEvents: "none",
          animationDelay: '0.1s'
        }}
      >
        <Star 
          className={`w-8 h-8 ${starColorClass}`}
          fill="currentColor"
          style={{
            filter: `blur(2px) drop-shadow(0 0 15px ${starColor})`,
          }}
        />
      </div>
      
      <div
        className="absolute star-trail z-[100]"
        style={{
          pointerEvents: "none",
          animationDelay: '0.2s'
        }}
      >
        <Star 
          className={`w-8 h-8 ${starColorClass}`}
          fill="currentColor"
          style={{
            filter: `blur(3px) drop-shadow(0 0 20px ${starColor})`,
          }}
        />
      </div>
      
      <div
        className="absolute star-trail z-[100]"
        style={{
          pointerEvents: "none",
          animationDelay: '0.3s'
        }}
      >
        <Star 
          className={`w-9 h-9 ${starColorClass}`}
          fill="currentColor"
          style={{
            filter: `blur(4px) drop-shadow(0 0 25px ${starColor})`,
          }}
        />
      </div>
      
      {/* Main star */}
      <div
        className="absolute star-trend-particle z-[100]"
        style={{
          pointerEvents: "none",
        }}
        data-testid={`star-animation-${startBetType}`}
      >
        <div className="relative">
          <Star 
            className={`w-12 h-12 ${starColorClass}`}
            fill="currentColor"
            style={{
              filter: `drop-shadow(0 0 20px ${starColor}) drop-shadow(0 0 30px ${starColor})`,
            }}
          />
          {/* Glow ring */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${starColor}70 0%, ${starColor}30 40%, transparent 70%)`,
              transform: 'scale(2.5)',
            }}
          />
        </div>
      </div>
    </>
  );
}
