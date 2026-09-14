import { useState, useCallback } from 'react';
import { Player, BoardSpace, GamePhase, Choice, FloatingPoint, AutoResult } from './types';
import { BOARD_SPACES } from './data/spaces';
import { soundManager } from './utils/audio';
import { Header } from './components/Header';
import { SetupScreen } from './components/SetupScreen';
import { Scoreboard } from './components/Scoreboard';
import { Board } from './components/Board';
import { Dice } from './components/Dice';
import { SpaceCardModal } from './components/SpaceCardModal';
import { FloatingPoints } from './components/FloatingPoints';
import { FinalScreen } from './components/FinalScreen';

export default function App() {
  const [phase, setPhase] = useState<GamePhase>('SETUP');
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);

  const [activeSpaceModal, setActiveSpaceModal] = useState<BoardSpace | null>(null);
  const [autoResult, setAutoResult] = useState<AutoResult | null>(null);
  
  const [isMovingPawn, setIsMovingPawn] = useState<boolean>(false);
  const [activeBoardSpaceId, setActiveBoardSpaceId] = useState<number | undefined>(undefined);
  
  const [floatingPoints, setFloatingPoints] = useState<FloatingPoint[]>([]);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Start game handler
  const handleStartGame = (initialPlayers: Player[]) => {
    setPlayers(initialPlayers);
    setCurrentPlayerIndex(0);
    setPhase('PLAYING');
    setActiveSpaceModal(null);
    setAutoResult(null);
  };

  // Sound mute toggle
  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  // Restart game
  const handleRestartGame = () => {
    setPhase('SETUP');
    setPlayers([]);
    setCurrentPlayerIndex(0);
    setActiveSpaceModal(null);
    setAutoResult(null);
    setIsMovingPawn(false);
  };

  const currentPlayer = players[currentPlayerIndex] || null;

  // Dice roll step-by-step pawn movement logic
  const handleDiceRoll = useCallback((diceValue: number) => {
    if (!currentPlayer || isMovingPawn) return;

    setIsMovingPawn(true);
    const startPos = currentPlayer.position;
    const targetPos = Math.min(30, startPos + diceValue);

    let currentPos = startPos;

    const moveInterval = setInterval(() => {
      currentPos++;
      soundManager.playPawnStep();
      setActiveBoardSpaceId(currentPos);

      // Update player position state step-by-step
      setPlayers((prev) =>
        prev.map((p) =>
          p.id === currentPlayer.id
            ? { ...p, position: currentPos, isFinished: currentPos >= 30 }
            : p
        )
      );

      if (currentPos >= targetPos) {
        clearInterval(moveInterval);
        setIsMovingPawn(false);

        // Find landed space
        const landedSpace = BOARD_SPACES.find((s) => s.id === targetPos);
        if (landedSpace) {
          setTimeout(() => {
            if (landedSpace.type === 'automatic' && landedSpace.getAutoResult) {
              const res = landedSpace.getAutoResult(currentPlayer.rastro);
              setAutoResult(res);
            } else {
              setAutoResult(null);
            }
            setActiveSpaceModal(landedSpace);
          }, 300);
        }
      }
    }, 280);
  }, [currentPlayer, isMovingPawn]);

  // Helper to advance to next active turn
  const advanceTurn = useCallback((updatedPlayers: Player[]) => {
    // Check if ALL players are finished at space 30
    const allFinished = updatedPlayers.every((p) => p.position >= 30);
    if (allFinished) {
      setTimeout(() => {
        setPhase('END_SEQUENCE');
      }, 500);
      return;
    }

    // Find next player who hasn't reached space 30
    let nextIdx = (currentPlayerIndex + 1) % updatedPlayers.length;
    let attempts = 0;
    while (updatedPlayers[nextIdx].position >= 30 && attempts < updatedPlayers.length) {
      nextIdx = (nextIdx + 1) % updatedPlayers.length;
      attempts++;
    }

    if (attempts >= updatedPlayers.length) {
      // All done
      setPhase('END_SEQUENCE');
    } else {
      setCurrentPlayerIndex(nextIdx);
    }
  }, [currentPlayerIndex]);

  // Handle player option choice
  const handleChoiceSelected = (choice: Choice) => {
    if (!currentPlayer) return;

    // Apply points
    const deltaV = choice.vantagem;
    const deltaR = choice.rastro;

    const newVantagem = currentPlayer.vantagem + deltaV; // Can be negative
    const newRastro = Math.max(0, currentPlayer.rastro + deltaR); // Rastro NEVER drops below 0!

    const updatedPlayers = players.map((p) =>
      p.id === currentPlayer.id
        ? { ...p, vantagem: newVantagem, rastro: newRastro }
        : p
    );

    setPlayers(updatedPlayers);

    // Trigger Floating Particle Animation
    const newParticles: FloatingPoint[] = [];
    const screenX = window.innerWidth / 2 + (Math.random() * 80 - 40);
    const screenY = window.innerHeight / 2;

    if (deltaV !== 0) {
      newParticles.push({
        id: `v-${Date.now()}`,
        text: deltaV > 0 ? `+${deltaV} V` : `${deltaV} V`,
        type: 'vantagem',
        isGain: deltaV > 0,
        x: screenX - 40,
        y: screenY,
        targetPlayerId: currentPlayer.id,
      });
    }

    if (deltaR !== 0) {
      newParticles.push({
        id: `r-${Date.now()}`,
        text: deltaR > 0 ? `+${deltaR} R` : `${deltaR} R`,
        type: 'rastro',
        isGain: deltaR <= 0,
        x: screenX + 40,
        y: screenY + 20,
        targetPlayerId: currentPlayer.id,
      });
    }

    setFloatingPoints((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setFloatingPoints((prev) => prev.filter((item) => !newParticles.some((np) => np.id === item.id)));
    }, 1200);

    // Close modal & pass turn
    setActiveSpaceModal(null);
    setAutoResult(null);
    advanceTurn(updatedPlayers);
  };

  // Handle automatic space confirmation
  const handleAutoConfirm = (result: { vantagem: number; rastro: number }) => {
    if (!currentPlayer) return;

    const deltaV = result.vantagem;
    const deltaR = result.rastro;

    const newVantagem = currentPlayer.vantagem + deltaV;
    const newRastro = Math.max(0, currentPlayer.rastro + deltaR);

    const updatedPlayers = players.map((p) =>
      p.id === currentPlayer.id
        ? { ...p, vantagem: newVantagem, rastro: newRastro }
        : p
    );

    setPlayers(updatedPlayers);

    // Particles
    if (deltaV !== 0 || deltaR !== 0) {
      const screenX = window.innerWidth / 2;
      const screenY = window.innerHeight / 2;
      const pId = currentPlayer.id;

      const particles: FloatingPoint[] = [];
      if (deltaV !== 0) {
        particles.push({
          id: `v-auto-${Date.now()}`,
          text: deltaV > 0 ? `+${deltaV} V` : `${deltaV} V`,
          type: 'vantagem',
          isGain: deltaV > 0,
          x: screenX - 30,
          y: screenY,
          targetPlayerId: pId,
        });
      }
      if (deltaR !== 0) {
        particles.push({
          id: `r-auto-${Date.now()}`,
          text: deltaR > 0 ? `+${deltaR} R` : `${deltaR} R`,
          type: 'rastro',
          isGain: deltaR <= 0,
          x: screenX + 30,
          y: screenY + 15,
          targetPlayerId: pId,
        });
      }
      setFloatingPoints((prev) => [...prev, ...particles]);
      setTimeout(() => {
        setFloatingPoints((prev) => prev.filter((item) => !particles.some((p) => p.id === item.id)));
      }, 1200);
    }

    setActiveSpaceModal(null);
    setAutoResult(null);
    advanceTurn(updatedPlayers);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <Header
        currentPlayer={currentPlayer || undefined}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onRestartGame={handleRestartGame}
        isGameActive={phase === 'PLAYING'}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* SETUP PHASE */}
        {phase === 'SETUP' && <SetupScreen onStartGame={handleStartGame} />}

        {/* PLAYING PHASE */}
        {phase === 'PLAYING' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Scoreboard */}
            <Scoreboard players={players} currentPlayerId={currentPlayer?.id || 0} />

            {/* Middle Section: Board + Dice Control */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
              {/* Board Canvas (Takes 3 columns) */}
              <div className="lg:col-span-3">
                <Board
                  spaces={BOARD_SPACES}
                  players={players}
                  activeSpaceId={activeBoardSpaceId}
                />
              </div>

              {/* Dice & Turn Control Panel (Takes 1 column) */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md flex flex-col items-center justify-center min-h-[320px]">
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-4 text-center">
                  Painel de Controle
                </h4>

                {currentPlayer ? (
                  <Dice
                    onRoll={handleDiceRoll}
                    disabled={isMovingPawn || activeSpaceModal !== null}
                    currentPlayerName={currentPlayer.name}
                    currentPlayerHexColor={currentPlayer.hexColor}
                  />
                ) : (
                  <p className="text-sm font-semibold text-slate-500">Calculando próxima jogada...</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* END SEQUENCE PHASE */}
        {phase === 'END_SEQUENCE' && (
          <FinalScreen players={players} onRestartGame={handleRestartGame} />
        )}
      </main>

      {/* Floating Score Particles */}
      <FloatingPoints items={floatingPoints} />

      {/* Space Decision Card Modal */}
      <SpaceCardModal
        isOpen={activeSpaceModal !== null}
        space={activeSpaceModal}
        player={currentPlayer}
        autoResult={autoResult}
        onChoiceSelected={handleChoiceSelected}
        onAutoConfirm={handleAutoConfirm}
      />
    </div>
  );
}
