import { MdTrendingUp } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineFiberNew } from "react-icons/md";
import { useGameManagerContext } from "@/contexts/GameManagerContext";
import { useEffect, useState, useRef } from "react";

export default function TrendSection() {
  const { roundHistory } = useGameManagerContext();
  const [isNewEntry, setIsNewEntry] = useState(false);
  const prevHistoryLengthRef = useRef(roundHistory.length);
  
  // Convert winner names to display letters
  const trends = roundHistory.map(winner => {
    if (winner === 'tiger') return 'T';
    if (winner === 'dragon') return 'D';
    return 'Tie';
  });
  
  // Fill empty slots if less than 10 results - newest on right
  const displayTrends = [...Array(10)].map((_, index) => {
    const trendIndex = trends.length - 10 + index;
    return trendIndex >= 0 ? trends[trendIndex] : '';
  });

  // Detect new entry and trigger bounce animation
  useEffect(() => {
    if (roundHistory.length > prevHistoryLengthRef.current) {
      setIsNewEntry(true);
      const timer = setTimeout(() => setIsNewEntry(false), 1000);
      prevHistoryLengthRef.current = roundHistory.length;
      return () => clearTimeout(timer);
    }
    prevHistoryLengthRef.current = roundHistory.length;
  }, [roundHistory.length]);

  return (
    <>
      <style>{`
        @keyframes slideInFromRight {
          0% {
            opacity: 0;
            transform: translateX(20px) scale(0.8);
          }
          50% {
            transform: translateX(-5px) scale(1.15);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        
        @keyframes newEntryGlow {
          0%, 100% {
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.8), 0 0 30px rgba(147, 51, 234, 0.6);
          }
        }
        
        .trend-item-new {
          animation: slideInFromRight 0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        
        .trend-item-glow {
          animation: newEntryGlow 1s ease-in-out;
        }
        
        .trend-container {
          transition: all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
      `}</style>

      <div className="game-element text-purple-300 rounded-lg border-purple-500 border-2 p-2 select-none z-30"
           style={{ 
             top: '-30%', 
             right: '2%',
             background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.8), rgba(59, 130, 246, 0.6))',
             boxShadow: '0 4px 10px rgba(147, 51, 234, 0.4)'
           }}>
        <FaUserAlt size={20} />
      </div>

      <div className="game-element text-purple-900 rounded-lg border-purple-400 border-2 select-none p-2"
           style={{ 
             top: '32.8%', 
             left: '-18%', 
             zIndex: 400,
             background: 'linear-gradient(135deg, #a78bfa, #c084fc)',
             boxShadow: '0 4px 10px rgba(147, 51, 234, 0.4)'
           }}>
        <MdTrendingUp size={22} />
      </div>

      <div className="game-element text-purple-900 rounded-t-lg border-purple-400 border-2 select-none px-3 py-1"
           style={{ 
             top: '6%', 
             right: '17%', 
             zIndex: 400,
             background: 'linear-gradient(135deg, #a78bfa, #c084fc)',
             boxShadow: '0 4px 10px rgba(147, 51, 234, 0.4)'
           }}
           data-testid="trend-new-badge">
        <MdOutlineFiberNew size={18} />
      </div>

      <div className="game-element py-2 flex items-center gap-2 border-purple-500 border-2 justify-center z-40 rounded-lg trend-container"
           style={{ 
             top: '30%', 
             right: '17.5%', 
             width: '90%',
             background: 'rgba(0, 0, 0, 0.5)',
             boxShadow: '0 4px 10px rgba(147, 51, 234, 0.4)'
           }}
           data-testid="trend-container">
        {displayTrends.map((v, i) => {
          const isLatest = i === 9 && v !== '';
          const shouldAnimate = isLatest && isNewEntry;
          
          return (
            <div
              key={`${i}-${v}-${roundHistory.length}`}
              id={i === 9 ? 'trend-latest' : undefined}
              data-testid={i === 9 ? 'trend-latest' : `trend-item-${i}`}
              className={
                "w-8 h-7 flex flex-wrap text-xs justify-center items-center font-bold select-none rounded border-2 transition-all duration-500 " +
                (v === "T"
                  ? "bg-gradient-to-br from-red-600 to-orange-500 text-white border-red-400"
                  : v === "D"
                  ? "bg-gradient-to-br from-blue-600 to-indigo-500 text-white border-blue-400"
                  : v === "Tie"
                  ? "bg-gradient-to-br from-green-600 to-teal-500 text-white border-green-400"
                  : "bg-gray-700 bg-opacity-50 border-gray-600 text-gray-500") +
                (shouldAnimate ? " trend-item-new trend-item-glow" : "")
              }
              style={{
                boxShadow: v ? '0 2px 6px rgba(0, 0, 0, 0.3)' : 'none'
              }}
            >
              {v}
            </div>
          );
        })}
      </div>
    </>
  );
}
