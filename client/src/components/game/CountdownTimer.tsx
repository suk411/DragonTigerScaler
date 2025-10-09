

interface CountdownTimerProps {
  initial: number;
  currentTime?: number;
}

export default function CountdownTimer({ currentTime }: CountdownTimerProps) {
  const displayTime = currentTime ?? 15;

  return (
    <div className="relative flex items-center justify-center select-none">
      <div
        className="relative rounded-full  bg-gray-600/70 shadow-lg flex items-center justify-center"
        style={{
          width: "65px",
          height: "65px",
          border: "3px solid #b45309",
        }}
      >
       
        <span
          className="relative z-10 text-lg font-bold"
          style={{ color: "#ffa200" }}
        >
          {displayTime}
        </span>
      </div>
    </div>
  );
}