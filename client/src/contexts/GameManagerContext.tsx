import { createContext, useContext, ReactNode } from "react";
import { useGameManager } from "@/hooks/useGameManager";

interface GameRound {
  id: number;
  dragon_card: string | null;
  tiger_card: string | null;
  winner: string | null;
}

interface GameManagerContextType {
  balance: number;
  placeBet: (betType: string, amount: number) => Promise<boolean>;
  getTotalBets: (betType: string) => number;
  currentRound: GameRound;
}

const GameManagerContext = createContext<GameManagerContextType | null>(null);

export function GameManagerProvider({ children }: { children: ReactNode }) {
  const gameManager = useGameManager();

  return (
    <GameManagerContext.Provider value={gameManager}>
      {children}
    </GameManagerContext.Provider>
  );
}

export function useGameManagerContext() {
  const context = useContext(GameManagerContext);
  if (!context) {
    throw new Error("useGameManagerContext must be used within GameManagerProvider");
  }
  return context;
}
