import ResponsiveGameContainer from "@/components/ResponsiveGameContainer";
import DragonTigerGame from "@/components/game/DragonTigerGame";
import { GameManagerProvider } from "@/contexts/GameManagerContext";

export default function Home() {
  return (
    <ResponsiveGameContainer aspectRatio={16 / 9} baseWidth={1600} baseHeight={900}>
      <GameManagerProvider>
        <DragonTigerGame />
      </GameManagerProvider>
    </ResponsiveGameContainer>
  );
}