
interface CountdownTimerProps {
  initial: number;
  currentTime?: number;
  currentPhase?: 'betting' | 'revealing';
}

export default function CountdownTimer({ currentTime, currentPhase }: CountdownTimerProps) {
  const displayTime = currentTime ?? 15;
  const phase = currentPhase ?? 'betting';
  
  // Calculate progress percentage for border animation
  const maxTime = phase === 'betting' ? 15 : 10;
  const progress = ((maxTime - displayTime) / maxTime) * 100;

  return (
    <div className="relative flex items-center justify-center select-none">
      <div
        className="relative rounded-full bg-gray-800/90 shadow-lg flex flex-col items-center justify-center"
        style={{
          width: "80px",
          height: "80px",
        }}
      >
        {/* Progressive yellow border */}
        <svg
          className="absolute inset-0 -rotate-90"
          width="80"
          height="80"
          style={{ filter: 'drop-shadow(0 0 8px rgba(234, 179, 8, 0.8))' }}
        >
          <circle
            cx="40"
            cy="40"
            r="37"
            fill="none"
            stroke="#eab308"
            strokeWidth="4"
            strokeDasharray={`${2 * Math.PI * 37}`}
            strokeDashoffset={`${2 * Math.PI * 37 * (1 - progress / 100)}`}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 1s linear'
            }}
          />
        </svg>

        {/* Timer number */}
        <span
          className="relative z-10 text-2xl font-bold"
          style={{ color: "#fbbf24" }}
        >
          {displayTime}
        </span>
        
        {/* Phase text */}
        <span
          className="relative z-10 text-xs font-semibold capitalize"
          style={{ color: "#fbbf24" }}
        >
          {phase === 'betting' ? 'Betting' : 'Result'}
        </span>
      </div>
    </div>
  );
}
