import { MdTrendingUp } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineFiberNew } from "react-icons/md";
import { useGameManagerContext } from "@/contexts/GameManagerContext";

export default function TrendSection() {
  const { roundHistory } = useGameManagerContext();
  
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

  return (
    <>
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
           }}>
        <MdOutlineFiberNew size={18} />
      </div>

      <div className="game-element py-2 flex items-center gap-2 border-purple-500 border-2 justify-center z-40 rounded-lg"
           style={{ 
             top: '30%', 
             right: '17.5%', 
             width: '90%',
             background: 'rgba(0, 0, 0, 0.5)',
             boxShadow: '0 4px 10px rgba(147, 51, 234, 0.4)'
           }}>
        {displayTrends.map((v, i) => (
          <div
            key={i}
            id={i === 9 ? 'trend-latest' : undefined}
            className={
              "w-8 h-7 flex flex-wrap text-xs justify-center items-center font-bold select-none rounded border-2 transition-all duration-500 " +
              (v === "T"
                ? "bg-gradient-to-br from-red-600 to-orange-500 text-white border-red-400"
                : v === "D"
                ? "bg-gradient-to-br from-blue-600 to-indigo-500 text-white border-blue-400"
                : v === "Tie"
                ? "bg-gradient-to-br from-green-600 to-teal-500 text-white border-green-400"
                : "bg-gray-700 bg-opacity-50 border-gray-600 text-gray-500")
            }
            style={{
              boxShadow: v ? '0 2px 6px rgba(0, 0, 0, 0.3)' : 'none'
            }}
          >
            {v}
          </div>
        ))}
      </div>
    </>
  );
}
