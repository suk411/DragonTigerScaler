import clockIcon from "@/assets/clock-icon.png";

interface CountdownTimerProps {
  initial: number;
  currentTime?: number;
}

export default function CountdownTimer({ currentTime }: CountdownTimerProps) {
  const displayTime = currentTime ?? 15;

  return (
    <div className="relative flex items-center justify-center select-none">
      <div
        className="relative rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-lg flex items-center justify-center"
        style={{
          width: "65px",
          height: "65px",
          border: "3px solid #b45309",
        }}
      >
        <img
          src={clockIcon}
          alt="Clock"
          className="absolute top-0 left-0 w-full h-full object-cover rounded-full"
          style={{ pointerEvents: "none" }}
        />
        <span
          className="relative z-10 text-lg font-bold"
          style={{ color: "#443001" }}
        >
          {displayTime}
        </span>
      </div>
    </div>
  );
}