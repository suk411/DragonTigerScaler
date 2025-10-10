
import { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface StarTrendAnimationProps {
  startBetType: "dragon" | "tiger" | "tie";
  onComplete: () => void;
}

export default function StarTrendAnimation({ startBetType, onComplete }: StarTrendAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isAnimating) return null;

  const starColor = startBetType === 'dragon' ? '#60a5fa' : 
                    startBetType === 'tiger' ? '#fb923c' : '#4ade80';
  
  const starColorClass = startBetType === 'dragon' ? 'text-blue-400' : 
                         startBetType === 'tiger' ? 'text-orange-400' : 'text-green-400';

  // Calculate start and end positions using percentages
  let startXPercent = 50;
  let startYPercent = 60;
  
  if (startBetType === 'tie') {
    startXPercent = 52;
  } else if (startBetType === 'dragon') {
    startXPercent = 34;
  } else {
    startXPercent = 70;
  }
  
  const endXPercent = 66;
  const endYPercent = 36;

  return (
    <>
      <style>{`
        @keyframes starFloat {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.3) rotate(0deg);
          }
          10% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.5) rotate(36deg);
          }
          25% {
            transform: translate(-50%, -50%) scale(1.8) rotate(90deg);
          }
          40% {
            transform: translate(-50%, -50%) scale(2) rotate(144deg);
          }
          55% {
            transform: translate(-50%, -50%) scale(1.8) rotate(198deg);
          }
          70% {
            transform: translate(-50%, -50%) scale(1.5) rotate(252deg);
          }
          85% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.1) rotate(306deg);
          }
          95% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(0.6) rotate(342deg);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.3) rotate(360deg);
          }
        }
        
        @keyframes starPath {
          0% {
            left: ${startXPercent}%;
            top: ${startYPercent}%;
          }
          20% {
            left: calc(${startXPercent}% + (${endXPercent - startXPercent}%) * 0.15);
            top: calc(${startYPercent}% + (${endYPercent - startYPercent}%) * 0.15 - 5%);
          }
          40% {
            left: calc(${startXPercent}% + (${endXPercent - startXPercent}%) * 0.35);
            top: calc(${startYPercent}% + (${endYPercent - startYPercent}%) * 0.35 - 7%);
          }
          60% {
            left: calc(${startXPercent}% + (${endXPercent - startXPercent}%) * 0.6);
            top: calc(${startYPercent}% + (${endYPercent - startYPercent}%) * 0.6 - 5%);
          }
          80% {
            left: calc(${startXPercent}% + (${endXPercent - startXPercent}%) * 0.85);
            top: calc(${startYPercent}% + (${endYPercent - startYPercent}%) * 0.85 - 1%);
          }
          100% {
            left: ${endXPercent}%;
            top: ${endYPercent}%;
          }
        }
        
        @keyframes trailFadeOut {
          0% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1.3);
          }
          50% {
            opacity: 0.4;
            transform: translate(-50%, -50%) scale(0.9);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.3);
          }
        }
        
        @keyframes trailPath {
          0%, 100% {
            left: ${startXPercent}%;
            top: ${startYPercent}%;
          }
        }
        
        .star-main {
          animation: 
            starPath 2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
            starFloat 2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          will-change: left, top, transform, opacity;
          position: absolute;
          pointer-events: none;
          z-index: 100;
        }
        
        .star-trail {
          animation: 
            trailPath 1.5s ease-out forwards,
            trailFadeOut 1.5s ease-out forwards;
          will-change: transform, opacity;
          position: absolute;
          pointer-events: none;
          z-index: 99;
        }
      `}</style>
      
      {/* Trail particles */}
      <div
        className="star-trail"
        style={{
          left: `${startXPercent}%`,
          top: `${startYPercent}%`,
          animationDelay: '0.05s'
        }}
      >
        <Star 
          className={`w-10 h-10 ${starColorClass}`}
          fill="currentColor"
          style={{
            filter: `blur(2px) drop-shadow(0 0 20px ${starColor})`,
          }}
        />
      </div>
      
      <div
        className="star-trail"
        style={{
          left: `${startXPercent}%`,
          top: `${startYPercent}%`,
          animationDelay: '0.1s'
        }}
      >
        <Star 
          className={`w-10 h-10 ${starColorClass}`}
          fill="currentColor"
          style={{
            filter: `blur(3px) drop-shadow(0 0 25px ${starColor})`,
          }}
        />
      </div>
      
      <div
        className="star-trail"
        style={{
          left: `${startXPercent}%`,
          top: `${startYPercent}%`,
          animationDelay: '0.15s'
        }}
      >
        <Star 
          className={`w-11 h-11 ${starColorClass}`}
          fill="currentColor"
          style={{
            filter: `blur(4px) drop-shadow(0 0 30px ${starColor})`,
          }}
        />
      </div>
      
      {/* Main star */}
      <div
        className="star-main"
        data-testid={`star-animation-${startBetType}`}
      >
        <div className="relative">
          <Star 
            className={`w-14 h-14 ${starColorClass}`}
            fill="currentColor"
            style={{
              filter: `drop-shadow(0 0 25px ${starColor}) drop-shadow(0 0 40px ${starColor})`,
            }}
          />
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${starColor}90 0%, ${starColor}50 30%, transparent 70%)`,
              transform: 'scale(3)',
            }}
          />
        </div>
      </div>
    </>
  );
}
