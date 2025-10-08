import React from "react";
import { MdTrendingUp } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineFiberNew } from "react-icons/md";

export default function TrendSection() {
  const trends = ["T", "T", "T", "D", "T", "D", "T", "D", "D", "Ti"];

  return (
    <>
      {/* Other players icon */}
      <div className="game-element text-[rgb(253,155,137)] rounded-sm border-yellow-600 border-r-2 border-t-2 p-2 bg-[#450b00] select-none z-30"
           style={{ top: '-30%', right: '2%' }}>
        <FaUserAlt size={16} />
      </div>

      {/* trend icon */}
      <div className="game-element text-[#450b00] rounded-[8px] bg-yellow-700 border-yellow-500 border-2 select-none p-1"
           style={{ top: '32.8%', left: '-18%', zIndex: 400 }}>
        <MdTrendingUp size={18} />
      </div>
      {/* New icon */}
      <div className="game-element text-[#450b00] rounded-t-[8px]  bg-yellow-700 border-yellow-500 border-2 select-none px-2"
           style={{ top: '6%', right: '17%', zIndex: 400 }}>
        <MdOutlineFiberNew size={15} />
      </div>

      {/* Trend Bar */}
      <div className="game-element  p-1    bg-black/60   flex  items-center gap-1  border-yellow-600 border-y-2 justify-center z-40"
           style={{ top: '30%', right: '17.5%', width: '90%' }}>
        {trends.map((v, i) => (
          <div
            key={i}
            className={
              "w-6 h-5 flex   flex-wrap  text-[10px] justify-center items-center  font-bold text-yellow-200   select-none shadow " +
              (v === "T"
                ? "bg-[#7f4f25] text-white border-[#c8a978]"
                : v === "D"
                ? "bg-[#326474] text-white border-[#93d7f8]"
                : "bg-[#255e38] text-white border-[#43ad66]")
            }
          >
            {v}
          </div>
        ))}
      </div>
    </>
  );
}
