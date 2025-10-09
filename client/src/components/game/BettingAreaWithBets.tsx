import dragonBody from "@/assets/dragon-body.png";
import tigerBody from "@/assets/tiger-body.png";
import GameCards from "./GameCards";
import CountdownTimer from "./CountdownTimer";
import TrendSection from "./TrendSection";
import BettingNotification from "./BettingNotification";
import { useState, useEffect } from "react";
import { useGameManagerContext } from "@/contexts/GameManagerContext";
import CoinAnimation from "./CoinAnimation";
import { useToast } from "@/hooks/use-toast";

interface BettingAreaProps {
  timer: number;
  selectedChip: number | null;
}

type BetType = "tie" | "dragon" | "tiger";

export default function BettingAreaWithBets({
  timer,
  selectedChip,
}: BettingAreaProps) {
  const [currentPhase, setCurrentPhase] = useState<"betting" | "revealing">(
    "betting",
  );
  const [timeRemaining, setTimeRemaining] = useState(15);
  const [animations, setAnimations] = useState<
    Array<{ id: string; targetId: string; amount: number }>
  >([]);
  const [clickedBet, setClickedBet] = useState<BetType | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [winningBetArea, setWinningBetArea] = useState<BetType | null>(null);
  const {
    placeBet,
    getTotalBets,
    balance,
    currentRound,
    updateBalance,
    clearBets,
  } = useGameManagerContext();
  const { toast } = useToast();

  useEffect(() => {
    // Show "Start Betting" on mount
    setNotificationMessage("Start Betting");
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);

    // Main game loop
    const gameLoop = setInterval(() => {
      setTimeRemaining((prev) => {
        if (currentPhase === "betting") {
          if (prev <= 1) {
            // Switch to revealing phase
            setCurrentPhase("revealing");
            setNotificationMessage("Stop Betting");
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 2000);
            return 10;
          }
          return prev - 1;
        } else {
          // Revealing phase
          if (prev <= 1) {
            // Switch back to betting phase
            setCurrentPhase("betting");
            setNotificationMessage("Start Betting");
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 2000);
            setWinningBetArea(null);
            return 15;
          }
          return prev - 1;
        }
      });
    }, 1000);

    return () => clearInterval(gameLoop);
  }, [currentPhase]);

  // Handle winner glow at 4th second of revealing phase (timeRemaining = 6)
  useEffect(() => {
    if (
      currentPhase === "revealing" &&
      timeRemaining === 6 &&
      currentRound?.winner
    ) {
      setWinningBetArea(currentRound.winner as BetType);
    }
  }, [currentPhase, timeRemaining, currentRound]);

  // Handle balance update at 5th second (timeRemaining = 5)
  useEffect(() => {
    if (currentPhase === "revealing" && timeRemaining === 5) {
      updateBalance();
    }
  }, [currentPhase, timeRemaining, updateBalance]);

  // Clear bets and reset at the end of revealing phase
  useEffect(() => {
    if (currentPhase === "revealing" && timeRemaining === 1) {
      clearBets();
      setWinningBetArea(null);
    }
  }, [currentPhase, timeRemaining, clearBets]);

  const handleBetClick = async (betType: BetType) => {
    if (currentPhase !== "betting") {
      return;
    }

    if (!selectedChip) {
      return;
    }

    if (selectedChip > balance) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough balance to place this bet.",
        variant: "destructive",
      });
      return;
    }

    // Show green border feedback
    setClickedBet(betType);
    setTimeout(() => setClickedBet(null), 300);

    const animId = `${Date.now()}_${Math.random()}`;
    setAnimations((prev) => [
      ...prev,
      { id: animId, targetId: betType, amount: selectedChip },
    ]);

    const success = await placeBet(betType, selectedChip);
    if (!success) {
      toast({
        title: "Bet failed",
        description: "Could not place your bet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const removeAnimation = (id: string) => {
    setAnimations((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="relative w-full h-full">
      <style>
        {`
          @keyframes upDownImg {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          .animate-upDownImg {
            animation: upDownImg 4s ease-in-out infinite;
          }
          .flame-container {
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 18%;
            height: 15%;
            transform: translateX(-50%);
            pointer-events: none;
            z-index: 16;
            overflow: visible;
          }
          .flame-particle {
            position: absolute;
            bottom: 16px;
            width: 12px;
            height: 12px;
            background: radial-gradient(circle, rgba(255,165,0,0.9) 40%, transparent 90%);
            border-radius: 50%;
            filter: drop-shadow(0 0 4px #ffae00);
            animation: particleUp 4s linear infinite;
          }
          .flame-particle:nth-child(1) { left: 12%; animation-delay: 0s; }
          .flame-particle:nth-child(2) { left: 45%; animation-delay: 1.3s; }
          .flame-particle:nth-child(3) { left: 77%; animation-delay: 2.6s; }
          
          .water-container {
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 18%;
            height: 15%;
            transform: translateX(-50%);
            pointer-events: none;
            z-index: 16;
            overflow: visible;
          }
          .water-particle {
            position: absolute;
            bottom: 16px;
            width: 12px;
            height: 12px;
            background: radial-gradient(circle, rgba(59,130,246,0.9) 40%, transparent 90%);
            border-radius: 50%;
            filter: drop-shadow(0 0 4px #3b82f6);
            animation: particleUp 4s linear infinite;
          }
          .water-particle:nth-child(1) { left: 12%; animation-delay: 0s; }
          .water-particle:nth-child(2) { left: 45%; animation-delay: 1.3s; }
          .water-particle:nth-child(3) { left: 77%; animation-delay: 2.6s; }
          
          @keyframes particleUp {
            0% { opacity: 1; transform: translateY(0) scale(1); }
            100% { opacity: 0; transform: translateY(-90px) scale(1.4); }
          }
          .creature-container {
            position: absolute;
            top: 0%;
            width: 50%;
            max-width: 360px;
            user-select: none;
            z-index: 20;
            display: flex;
            justify-content: center;
            align-items: flex-end;
          }
          .game-element {
            position: absolute;
          }

          /* Progressive yellow border animation */
          @keyframes progressiveYellowBorder {
            0% {
              box-shadow: 0 0 0 0 rgba(250, 204, 21, 0.7);
            }
            50% {
              box-shadow: 0 0 0 10px rgba(250, 204, 21, 0.7);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(250, 204, 21, 0.7);
            }
          }
          .border-winning {
            animation: progressiveYellowBorder 2s infinite;
          }

          /* Decorative border container */
          .betting-border-container {
            position: absolute;
            bottom: 24%;
            left: 22%;
            width: 56%;
            height: 30%;
            border: 3px solid rgba(147, 51, 234, 0.6);
            border-radius: 12px;
            background: linear-gradient(135deg, rgba(88, 28, 135, 0.3), rgba(59, 130, 246, 0.2));
            box-shadow: 
              inset 0 2px 8px rgba(147, 51, 234, 0.4),
              0 4px 20px rgba(147, 51, 234, 0.5);
            pointer-events: none;
            z-index: 5;
          }
        `}
      </style>

      <BettingNotification
        message={notificationMessage}
        show={showNotification}
      />

      {animations.map((anim) => (
        <CoinAnimation
          key={anim.id}
          amount={anim.amount}
          targetId={anim.targetId}
          onComplete={() => removeAnimation(anim.id)}
        />
      ))}

      <div
        className="creature-container animate-upDownImg"
        style={{ top: "2%", left: "10%" }}
      >
        <img
          src={dragonBody}
          alt="Dragon"
          style={{ width: "100%", height: "auto" }}
        />
        <div className="water-container">
          <div className="water-particle"></div>
          <div className="water-particle"></div>
          <div className="water-particle"></div>
        </div>
      </div>

      <div
        className="creature-container animate-upDownImg"
        style={{ top: "3%", right: "10%" }}
      >
        <img
          src={tigerBody}
          alt="Tiger"
          style={{ width: "100%", height: "auto" }}
        />
        <div className="flame-container">
          <div className="flame-particle"></div>
          <div className="flame-particle"></div>
          <div className="flame-particle"></div>
        </div>
      </div>

      <div
        className="absolute left-1/2"
        style={{ top: "8%", transform: "translateX(-50%)" }}
      >
        <CountdownTimer
          initial={timer}
          currentTime={timeRemaining}
          currentPhase={currentPhase}
        />
      </div>

      <div
        className="absolute "
        style={{ top: "30%",right: "19%", height: "10%", width: "50%" }}
      >
        <TrendSection />
      </div>

      <div
        className="absolute left-1/2"
        style={{ top: "3.5%", transform: "translateX(-50%)" }}
      >
        <GameCards
          currentPhase={currentPhase}
          timeRemaining={timeRemaining}
          dragonCard={currentRound?.dragon_card || null}
          tigerCard={currentRound?.tiger_card || null}
          roundWinner={currentRound?.winner || null}
        />
      </div>

      {/* Decorative Border */}
      <div className="betting-border-container"></div>

      <div
        id="tie-betting-area"
        className={`game-element rounded- border-2  bg-gradient-to-br from-emerald-900 to-teal-700 shadow-lg cursor-pointer select-none flex items-center justify-center z-10 transition-all duration-300 ${
          clickedBet === "tie"
            ? "border-green-400 shadow-[0_0_20px_rgba(74,222,128,0.8)]"
            : winningBetArea === "tie"
              ? "border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,1)] scale-100 border-winning"
              : "border-black"
        }`}
        style={{ bottom: "25%", left: "43%", width: "14%", height: "28%" }}
        onClick={() => handleBetClick("tie")}
        data-testid="bet-tie"
      >
        <span
          className="absolute text-emerald-100/65 text-xs font-semibold bg-green-700 bg-opacity-40 rounded-b-sm px-4 select-none z-20"
          style={{ top: "0%", left: "50%", transform: "translateX(-50%)" }}
        >
          {getTotalBets("tie").toLocaleString()}
        </span>
        <div className="absolute -inset-4 rounded-xl bg-gradient-to-br from-emerald-700 to-cyan-700 opacity-20 blur-lg pointer-events-none"></div>
        <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-emerald-800 to-teal-800">
          <span
            className="text-cyan-100 text-xl font-semibold tracking-wide"
            style={{ textShadow: "0 2px 5px #0c4a6e", opacity: 0.5 }}
          >
            TIE x10
          </span>
        </div>
      </div>

      <div
        id="dragon-betting-area"
        className={`game-element rounded-l-lg border-2 bg-gradient-to-br from-indigo-900 to-blue-700 shadow-lg cursor-pointer select-none flex items-center justify-center z-10 transition-all duration-300 ${
          clickedBet === "dragon"
            ? "border-green-400 shadow-[0_0_20px_rgba(74,222,128,0.8)]"
            : winningBetArea === "dragon"
              ? "border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,1)] scale-100 border-winning"
              : "border-black"
        }`}
        style={{ bottom: "25%", left: "23%", width: "20%", height: "28%" }}
        onClick={() => handleBetClick("dragon")}
        data-testid="bet-dragon"
      >
        <span
          className="absolute text-emerald-100/65 text-xs font-semibold bg-indigo-900 bg-opacity-40 rounded-b-sm px-4 select-none z-20"
          style={{ top: "0%", left: "50%", transform: "translateX(-50%)" }}
        >
          {getTotalBets("dragon").toLocaleString()}
        </span>
        <div className="relative -inset-4 rounded-xl bg-gradient-to-br from-blue-700 to-sky-700 opacity-20 blur-lg pointer-events-none"></div>
        <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-blue-800 to-blue-800">
          <span
            className="text-blue-500 text-lg font-semibold tracking-wide flex flex-col items-center"
            style={{ opacity: 0.5, textShadow: "0 2px 0 black" }}
          >
            <span>DRAGON</span>
            <span>2x</span>
          </span>
        </div>
      </div>

      <div
        id="tiger-betting-area"
        className={`game-element rounded-r-xl border-2 bg-gradient-to-br from-red-900 to-yellow-700 shadow-lg cursor-pointer select-none flex items-center justify-center transition-all duration-300 ${
          clickedBet === "tiger"
            ? "border-green-400 shadow-[0_0_20px_rgba(74,222,128,0.8)]"
            : winningBetArea === "tiger"
              ? "border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,1)] scale-99 border-winning"
              : "border-black"
        }`}
        style={{
          bottom: "25%",
          right: "23%",
          width: "20%",
          height: "28%",
          zIndex: 10,
        }}
        onClick={() => handleBetClick("tiger")}
        data-testid="bet-tiger"
      >
        <span
          className="absolute text-emerald-100/65 text-xs font-semibold bg-red-900 bg-opacity-40 rounded-b-sm px-4 select-none z-20"
          style={{ top: "0%", left: "50%", transform: "translateX(-50%)" }}
        >
          {getTotalBets("tiger").toLocaleString()}
        </span>
        <div className="relative -inset-4 rounded-xl bg-gradient-to-br from-red-700 to-yellow-700 opacity-20 blur-lg pointer-events-none"></div>
        <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-yellow-800 to-red-800">
          <span
            className="text-yellow-500 text-lg font-semibold tracking-wide flex flex-col items-center"
            style={{ opacity: 0.5, textShadow: "0 2px 0 black" }}
          >
            <span>TIGER</span>
            <span>2x</span>
          </span>
        </div>
      </div>
    </div>
  );
}
