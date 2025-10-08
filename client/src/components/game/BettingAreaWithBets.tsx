import dragonBody from "@/assets/dragon-body.png";
import tigerBody from "@/assets/tiger-body.png";
import GameCards from "./GameCards";
import CountdownTimer from "./CountdownTimer";
import TrendSection from "./TrendSection";
import { useState } from "react";
import { useGameManagerContext } from "@/contexts/GameManagerContext";
import CoinAnimation from "./CoinAnimation";
import { useToast } from "@/hooks/use-toast";

interface BettingAreaProps {
  timer: number;
  selectedChip: number | null;
}

// Define BetType for clarity
type BetType = 'tie' | 'dragon' | 'tiger';

export default function BettingAreaWithBets({ timer, selectedChip }: BettingAreaProps) {
  const [currentPhase, setCurrentPhase] = useState<'betting' | 'revealing'>('betting');
  const [timeRemaining, setTimeRemaining] = useState(timer);
  const [animations, setAnimations] = useState<Array<{ id: string; targetId: string; amount: number }>>([]);
  const { placeBet, getTotalBets, balance, currentRound } = useGameManagerContext();
  const { toast } = useToast();

  const handlePhaseChange = (phase: 'betting' | 'revealing', time: number) => {
    setCurrentPhase(phase);
    setTimeRemaining(time);
  };

  const handleBetClick = async (betType: BetType) => {
    if (currentPhase !== 'betting') {
      return;
    }

    if (!selectedChip) {
      return;
    }

    if (selectedChip > balance) {
      return;
    }

    const animId = `${Date.now()}_${Math.random()}`;
    setAnimations(prev => [...prev, { id: animId, targetId: betType, amount: selectedChip }]);

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
    setAnimations(prev => prev.filter(a => a.id !== id));
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
          @keyframes particleUp {
            0% { opacity: 1; transform: translateY(0) scale(1); }
            100% { opacity: 0; transform: translateY(-90px) scale(1.4); }
          }
          .creature-container {
            position: absolute;
            top: 0%;
            width: 25%;
            max-width: 180px;
            user-select: none;
            z-index: 20;
            display: flex;
            justify-content: center;
            align-items: flex-end;
          }
          .game-element {
            position: absolute;
          }
        `}
      </style>

      {animations.map(anim => (
        <CoinAnimation
          key={anim.id}
          amount={anim.amount}
          targetId={anim.targetId}
          onComplete={() => removeAnimation(anim.id)}
        />
      ))}

      <div className="creature-container animate-upDownImg"
           style={{ top:'3%', left: '5%' }}>
        <img src={dragonBody} alt="Dragon" style={{ width: '100%', height: 'auto' }} />
      </div>

      <div className="creature-container animate-upDownImg"
           style={{ top:'3.7%', right: '5%' }}>
        <img src={tigerBody} alt="Tiger" style={{ width: '100%', height: 'auto' }} />
        <div className="flame-container">
          <div className="flame-particle"></div>
          <div className="flame-particle"></div>
          <div className="flame-particle"></div>
        </div>
      </div>

      <div className="absolute left-1/2" style={{ top: '29%', transform: 'translateX(-50%)' }}>
        <CountdownTimer initial={timer} onPhaseChange={handlePhaseChange} />
      </div>

      <div className="absolute right-0" style={{ top: '36%', height: '10%', width: '80%' }}>
        <TrendSection />
      </div>

      <div className="absolute left-1/2" style={{ top: '15%', transform: 'translateX(-50%)' }}>
        <GameCards 
          currentPhase={currentPhase} 
          timeRemaining={timeRemaining}
          dragonCard={currentRound?.dragon_card || null}
          tigerCard={currentRound?.tiger_card || null}
          roundWinner={currentRound?.winner || null}
        />
      </div>

      <div 
        id="tie-betting-area"
        className="game-element rounded-xl border-blue-400 border-4 bg-gradient-to-br from-emerald-900 to-teal-700 shadow-lg cursor-pointer select-none flex items-center justify-center z-10"
        style={{ bottom: '38%', left: '10%', width: '80%', height: '16%' }}
        onClick={() => handleBetClick('tie')}
        data-testid="bet-tie">
        <span className="absolute text-emerald-100/65 text-xs font-semibold bg-green-700 bg-opacity-40 rounded-b-sm px-4 select-none z-20"
              style={{ top: '0%', left: '50%', transform: 'translateX(-50%)' }}>
          {getTotalBets('tie').toLocaleString()}
        </span>
        <div className="absolute -inset-4 rounded-xl bg-gradient-to-br from-emerald-700 to-cyan-700 opacity-20 blur-lg pointer-events-none"></div>
        <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-emerald-800 to-teal-800">
          <span className="text-cyan-100 text-xl font-semibold tracking-wide"
                style={{ textShadow: '0 2px 5px #0c4a6e', opacity: 0.5 }}>
            TIE x10
          </span>
        </div>
      </div>

      <div 
        id="dragon-betting-area"
        className="game-element rounded-xl border-black border-2 bg-gradient-to-br from-indigo-900 to-blue-700 shadow-lg cursor-pointer select-none flex items-center justify-center z-10"
        style={{ bottom: '13%', left: '9%', width: '39%', height: '24%' }}
        onClick={() => handleBetClick('dragon')}
        data-testid="bet-dragon">
        <span className="absolute text-emerald-100/65 text-xs font-semibold bg-indigo-900 bg-opacity-40 rounded-b-sm px-4 select-none z-20"
              style={{ top: '0%', left: '50%', transform: 'translateX(-50%)' }}>
          {getTotalBets('dragon').toLocaleString()}
        </span>
        <div className="relative -inset-4 rounded-xl bg-gradient-to-br from-blue-700 to-sky-700 opacity-20 blur-lg pointer-events-none"></div>
        <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-blue-800 to-blue-800">
          <span className="text-blue-500 text-lg font-semibold tracking-wide flex flex-col items-center"
                style={{ opacity: 0.5, textShadow: '0 2px 0 black' }}>
            <span>DRAGON</span>
            <span>2x</span>
          </span>
        </div>
      </div>

      <div 
        id="tiger-betting-area"
        className="game-element rounded-xl border-black border-2 bg-gradient-to-br from-red-900 to-yellow-700 shadow-lg cursor-pointer select-none flex items-center justify-center"
        style={{ bottom: '13%', right: '9%', width: '39%', height: '24%', zIndex: 10 }}
        onClick={() => handleBetClick('tiger')}
        data-testid="bet-tiger">
        <span className="absolute text-emerald-100/65 text-xs font-semibold bg-red-900 bg-opacity-40 rounded-b-sm px-4 select-none z-20"
              style={{ top: '0%', left: '50%', transform: 'translateX(-50%)' }}>
          {getTotalBets('tiger').toLocaleString()}
        </span>
        <div className="relative -inset-4 rounded-xl bg-gradient-to-br from-red-700 to-yellow-700 opacity-20 blur-lg pointer-events-none"></div>
        <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-yellow-800 to-red-800">
          <span className="text-yellow-500 text-lg font-semibold tracking-wide flex flex-col items-center"
                style={{ opacity: 0.5, textShadow: '0 2px 0 black' }}>
            <span>TIGER</span>
            <span>2x</span>
          </span>
        </div>
      </div>
    </div>
  );
}