import { useEffect, useState, useRef } from "react";
import { Star } from "lucide-react";

interface StarTrendAnimationProps {
  startBetType: "dragon" | "tiger" | "tie";
  onComplete: () => void;
}

export default function StarTrendAnimation({ startBetType, onComplete }: StarTrendAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(true);
  const starRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>();

  // Color configuration
  const starColor = startBetType === 'dragon' ? '#60a5fa' : 
                    startBetType === 'tiger' ? '#fb923c' : '#4ade80';
  
  const starColorClass = startBetType === 'dragon' ? 'text-blue-400' : 
                         startBetType === 'tiger' ? 'text-orange-400' : 'text-green-400';

  // Position configuration (percentages)
  const getStartPosition = () => {
    if (startBetType === 'tie') return { x: 52, y: 60 };
    if (startBetType === 'dragon') return { x: 34, y: 60 };
    return { x: 70, y: 60 }; // tiger
  };

  const startPos = getStartPosition();
  const endPos = { x: 66, y: 36 };

  useEffect(() => {
    const duration = 1800; // 1.8 seconds for smooth animation
    
    // Smooth easing function (ease-in-out-cubic)
    const easeInOutCubic = (t: number): number => {
      return t < 0.5 
        ? 4 * t * t * t 
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    // Animation loop
    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      if (starRef.current) {
        // Calculate smooth position with arc
        const deltaX = endPos.x - startPos.x;
        const deltaY = endPos.y - startPos.y;
        
        // Add arc to the path (goes up then down)
        const arcHeight = -8; // Negative to go up
        const currentArc = Math.sin(easedProgress * Math.PI) * arcHeight;
        
        const currentX = startPos.x + (deltaX * easedProgress);
        const currentY = startPos.y + (deltaY * easedProgress) + currentArc;
        
        // Smooth rotation
        const rotation = easedProgress * 720; // 2 full rotations
        
        // Smooth scale (grow then shrink)
        const scale = 0.5 + Math.sin(easedProgress * Math.PI) * 0.4;
        
        // Smooth opacity
        const opacity = progress < 0.1 ? progress * 10 : 
                       progress > 0.9 ? (1 - progress) * 10 : 1;
        
        starRef.current.style.left = `${currentX}%`;
        starRef.current.style.top = `${currentY}%`;
        starRef.current.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`;
        starRef.current.style.opacity = opacity.toString();
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        onComplete();
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [startBetType, onComplete, startPos.x, startPos.y, endPos.x, endPos.y]);

  if (!isAnimating) return null;

  return (
    <>
      <style>{`
        .star-particle {
          position: absolute;
          pointer-events: none;
          z-index: 100;
          will-change: left, top, transform, opacity;
        }
        
        @keyframes trailFade {
          0% {
            opacity: 0.7;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.2);
          }
        }
        
        .star-trail {
          position: absolute;
          pointer-events: none;
          z-index: 99;
          left: ${startPos.x}%;
          top: ${startPos.y}%;
          animation: trailFade 1s ease-out forwards;
        }
      `}</style>
      
      {/* Trail particles */}
      <div
        className="star-trail"
        style={{
          animationDelay: '0s'
        }}
      >
        <Star 
          className={`w-6 h-6 ${starColorClass}`}
          fill="currentColor"
          style={{
            filter: `blur(2px) drop-shadow(0 0 12px ${starColor})`,
          }}
        />
      </div>
      
      <div
        className="star-trail"
        style={{
          animationDelay: '0.1s'
        }}
      >
        <Star 
          className={`w-6 h-6 ${starColorClass}`}
          fill="currentColor"
          style={{
            filter: `blur(3px) drop-shadow(0 0 15px ${starColor})`,
          }}
        />
      </div>
      
      <div
        className="star-trail"
        style={{
          animationDelay: '0.2s'
        }}
      >
        <Star 
          className={`w-7 h-7 ${starColorClass}`}
          fill="currentColor"
          style={{
            filter: `blur(4px) drop-shadow(0 0 18px ${starColor})`,
          }}
        />
      </div>
      
      {/* Main star - 50% smaller (w-7 h-7 instead of w-14 h-14) */}
      <div
        ref={starRef}
        className="star-particle"
        data-testid={`star-animation-${startBetType}`}
      >
        <div className="relative">
          <Star 
            className={`w-7 h-7 ${starColorClass}`}
            fill="currentColor"
            style={{
              filter: `drop-shadow(0 0 15px ${starColor}) drop-shadow(0 0 20px ${starColor})`,
            }}
          />
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${starColor}80 0%, ${starColor}40 30%, transparent 60%)`,
              transform: 'scale(2)',
            }}
          />
        </div>
      </div>
    </>
  );
}
