import { useState, useEffect, useRef } from 'react';
import avatar1 from '../../assets/avatar1.png';
import avatar2 from '../../assets/avatar2.png';
import avatar3 from '../../assets/avatar3.png';
import avatar4 from '../../assets/avatar4.png';
import avatar5 from '../../assets/avatar5.png';
import avatar6 from '../../assets/avatar6.png';
import CoinAnimation from './CoinAnimation';

interface Winner {
  id: string;
  avatar: string;
  username: string;
  amount: number;
}

interface WinnersSectionProps {
  winners: Winner[];
  currentPhase: "betting" | "revealing";
  gameSeconds: number;
  onPlaceBet?: (playerId: string, betType: string, amount: number) => void;
  roundWinner?: string | null;
}

const defaultAvatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

interface PlayerBet {
  playerId: string;
  betType: string;
  amount: number;
}

interface BalanceChange {
  playerId: string;
  amount: number;
  id: string;
}

export default function WinnersSection({ 
  winners, 
  currentPhase, 
  gameSeconds,
  onPlaceBet,
  roundWinner 
}: WinnersSectionProps) {
  const [displayWinners, setDisplayWinners] = useState<Winner[]>([]);
  const [animations, setAnimations] = useState<Array<{ id: string; playerId: string; targetId: string; amount: number; startPos: { x: number; y: number } }>>([]);
  const [balanceChanges, setBalanceChanges] = useState<BalanceChange[]>([]);
  const [bouncingAvatars, setBouncingAvatars] = useState<Set<string>>(new Set());
  const [playerBets, setPlayerBets] = useState<Map<string, PlayerBet>>(new Map());
  const [playerBalances, setPlayerBalances] = useState<Map<string, number>>(new Map());
  const playerBetsRef = useRef<Map<string, PlayerBet>>(new Map());

  useEffect(() => {
    const winnersList = [...winners.slice(0, 3)];
    while (winnersList.length < 3) {
      winnersList.push({
        id: `empty-${winnersList.length}`,
        avatar: '',
        username: '---',
        amount: 0
      });
    }
    setDisplayWinners(winnersList);

    const balances = new Map<string, number>();
    winnersList.forEach(winner => {
      if (winner.amount > 0) {
        balances.set(winner.id, winner.amount);
      }
    });
    setPlayerBalances(balances);
  }, [winners]);

  useEffect(() => {
    playerBetsRef.current = playerBets;
  }, [playerBets]);

  useEffect(() => {
    if (currentPhase === "betting" && gameSeconds >= 2 && gameSeconds <= 13) {
      const shouldBet = Math.random() < 0.15;
      
      if (shouldBet) {
        const availablePlayers = displayWinners.filter(w => w.amount > 0 && !playerBetsRef.current.has(w.id));
        if (availablePlayers.length > 0) {
          const player = availablePlayers[Math.floor(Math.random() * availablePlayers.length)];
          const betTypes = ['dragon', 'tiger', 'tie'];
          const betType = betTypes[Math.floor(Math.random() * betTypes.length)];
          const betAmounts = [10, 20, 50, 100];
          const betAmount = betAmounts[Math.floor(Math.random() * betAmounts.length)];

          const playerElement = document.getElementById(`winner-avatar-${player.id}`);
          if (playerElement) {
            // Get the game container to calculate percentage-based positions
            const gameContainer = document.querySelector('.mobile-viewport');
            if (!gameContainer) return;
            
            const rect = playerElement.getBoundingClientRect();
            const containerRect = gameContainer.getBoundingClientRect();
            
            // Convert to percentage position relative to game container
            const startPos = {
              x: ((rect.left + rect.width / 2 - containerRect.left) / containerRect.width) * 100,
              y: ((rect.top + rect.height / 2 - containerRect.top) / containerRect.height) * 100
            };

            const animId = `${Date.now()}_${Math.random()}`;
            setAnimations(prev => [...prev, { 
              id: animId, 
              playerId: player.id, 
              targetId: betType, 
              amount: betAmount,
              startPos 
            }]);

            setBouncingAvatars(prev => new Set(prev).add(player.id));
            setTimeout(() => {
              setBouncingAvatars(prev => {
                const next = new Set(prev);
                next.delete(player.id);
                return next;
              });
            }, 400);

            const bet = { playerId: player.id, betType, amount: betAmount };
            playerBetsRef.current = new Map(playerBetsRef.current).set(player.id, bet);
            setPlayerBets(prev => new Map(prev).set(player.id, bet));
            
            setPlayerBalances(prev => {
              const next = new Map(prev);
              const currentBalance = next.get(player.id) || player.amount;
              next.set(player.id, currentBalance - betAmount);
              return next;
            });

            const changeId = `${Date.now()}_${player.id}`;
            setBalanceChanges(prev => [...prev, { playerId: player.id, amount: -betAmount, id: changeId }]);
            setTimeout(() => {
              setBalanceChanges(prev => prev.filter(c => c.id !== changeId));
            }, 1500);

            if (onPlaceBet) {
              onPlaceBet(player.id, betType, betAmount);
            }
          }
        }
      }
    }

    if (gameSeconds === 0) {
      playerBetsRef.current = new Map();
      setPlayerBets(new Map());
    }
  }, [currentPhase, gameSeconds, displayWinners, onPlaceBet]);

  useEffect(() => {
    if (gameSeconds === 21 && roundWinner) {
      playerBets.forEach((bet, playerId) => {
        if (bet.betType === roundWinner) {
          const multiplier = roundWinner === 'tie' ? 10 : 2;
          const winAmount = bet.amount * multiplier;
          
          setPlayerBalances(prev => {
            const next = new Map(prev);
            const currentBalance = next.get(playerId) || 0;
            next.set(playerId, currentBalance + winAmount);
            return next;
          });

          const changeId = `${Date.now()}_${playerId}`;
          setBalanceChanges(prev => [...prev, { playerId, amount: winAmount, id: changeId }]);
          setTimeout(() => {
            setBalanceChanges(prev => prev.filter(c => c.id !== changeId));
          }, 2000);
        }
      });
    }
  }, [gameSeconds, roundWinner]);

  const removeAnimation = (id: string) => {
    setAnimations(prev => prev.filter(a => a.id !== id));
  };

  return (
    <>
      {animations.map(anim => (
        <CoinAnimation
          key={anim.id}
          amount={anim.amount}
          targetId={anim.targetId}
          startPosition={anim.startPos}
          onComplete={() => removeAnimation(anim.id)}
        />
      ))}
      
      <div className="flex flex-col gap-4 h-full justify-start pt-2">
        <style>{`
          @keyframes avatarBounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.15); }
          }
          .avatar-bouncing {
            animation: avatarBounce 0.4s ease-in-out;
          }
          @keyframes balanceFloat {
            0% { 
              opacity: 0;
              transform: translateY(0) scale(0.8);
            }
            20% {
              opacity: 1;
              transform: translateY(-10px) scale(1);
            }
            100% { 
              opacity: 0;
              transform: translateY(-40px) scale(0.9);
            }
          }
          .balance-change {
            animation: balanceFloat 1.5s ease-out forwards;
            will-change: transform, opacity;
          }
        `}</style>
        
        {displayWinners.map((winner, index) => (
          <div
            key={winner.id}
            className="flex flex-col items-center gap-1 relative"
          >
            {index === 0 && (
              <div 
                className="absolute -top-6 text-center text-yellow-400 font-bold text-xs px-2 py-0.5 rounded"
                style={{
                  background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.8), rgba(59, 130, 246, 0.6))',
                  border: '2px solid rgba(234, 179, 8, 0.6)',
                }}
              >
                🏆 WINNERS
              </div>
            )}
            
            <div className="relative">
              <img 
                id={`winner-avatar-${winner.id}`}
                src={winner.avatar || defaultAvatars[index % defaultAvatars.length]} 
                alt={`Winner ${index + 1}`}
                className={`w-12 h-12 rounded-full border-2 border-yellow-400 object-cover transition-transform ${
                  bouncingAvatars.has(winner.id) ? 'avatar-bouncing' : ''
                }`}
                data-testid={`avatar-winner-${index}`}
              />
              
              {balanceChanges
                .filter(change => change.playerId === winner.id)
                .map(change => (
                  <div
                    key={change.id}
                    className="balance-change absolute left-1/2 -translate-x-1/2 font-bold text-sm whitespace-nowrap pointer-events-none z-50"
                    style={{
                      color: change.amount > 0 ? '#22c55e' : '#ef4444',
                      textShadow: '0 0 8px rgba(0,0,0,0.8)',
                      top: '-10px'
                    }}
                  >
                    {change.amount > 0 ? '+' : ''}{change.amount}
                  </div>
                ))}
            </div>
            
            <div className="text-yellow-400 text-xs font-bold" data-testid={`balance-winner-${index}`}>
              {playerBalances.get(winner.id) !== undefined 
                ? playerBalances.get(winner.id)!.toLocaleString()
                : winner.amount > 0 
                  ? winner.amount.toLocaleString() 
                  : '---'}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
