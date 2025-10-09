import { MdTrendingUp } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineFiberNew } from "react-icons/md";

export default function TrendSection() {
  const trends = ["T", "T", "T", "D", "T", "D", "T", "D", "D", "Ti"];

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

      <div className="game-element p-2 flex items-center gap-2 border-purple-500 border-2 justify-center z-40 rounded-lg"
           style={{ 
             top: '30%', 
             right: '17.5%', 
             width: '90%',
             background: 'rgba(0, 0, 0, 0.5)',
             boxShadow: '0 4px 10px rgba(147, 51, 234, 0.4)'
           }}>
        {trends.map((v, i) => (
          <div
            key={i}
            className={
              "w-8 h-7 flex flex-wrap text-xs justify-center items-center font-bold select-none rounded border-2 " +
              (v === "T"
                ? "bg-gradient-to-br from-red-600 to-orange-500 text-white border-red-400"
                : v === "D"
                ? "bg-gradient-to-br from-blue-600 to-indigo-500 text-white border-blue-400"
                : "bg-gradient-to-br from-green-600 to-teal-500 text-white border-green-400")
            }
            style={{
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)'
            }}
          >
            {v}
          </div>
        ))}
      </div>
    </>
  );
}
