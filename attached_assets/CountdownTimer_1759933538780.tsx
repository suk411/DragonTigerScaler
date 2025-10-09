import React, { useEffect, useState } from "react";


interface CountdownTimerProps {
  initial: number;
  onEnd?: () => void;
  onPhaseChange?: (phase: 'betting' | 'revealing', timeRemaining: number) => void;
}

export default function CountdownTimer({ initial, onEnd, onPhaseChange }: CountdownTimerProps) {
  const [time, setTime] = useState(initial);
  const [isFifteen, setIsFifteen] = useState(true); // true: 15s betting, false: 10s revealing

  useEffect(() => {
    const phase = isFifteen ? 'betting' : 'revealing';
    if (onPhaseChange) {
      onPhaseChange(phase, time);
    }
  }, [isFifteen, time, onPhaseChange]);

  useEffect(() => {
    if (time > 0) {
      const interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      // When timer hits 0, alternate between 15 and 10 seconds
      const timeout = setTimeout(() => {
        setIsFifteen((prev) => !prev);
        setTime(isFifteen ? 10 : 15);
        if (onEnd) onEnd();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [time, isFifteen, onEnd]);

  return (
    <div className="flex   items-center justify-center select-none">
      <div
        className="relative items-center justify-center"
        style={{ width: 65, height: 48 }}
      >
        
        <span
          className="absolute pl-[2px] pb-[2px] inset-0 flex items-end justify-center font-bold text-lg text-[#443001]"
        >
          {time}
        </span>
      </div>
    </div>
  );
}
