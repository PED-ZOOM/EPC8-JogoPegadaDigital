import React from 'react';
import { Volume2, VolumeX, RotateCcw, ShieldCheck } from 'lucide-react';
import { Player } from '../types';
import { PLAYER_COLOR_CONFIGS } from '../data/spaces';

interface HeaderProps {
  currentPlayer?: Player;
  isMuted: boolean;
  onToggleMute: () => void;
  onRestartGame: () => void;
  isGameActive: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentPlayer,
  isMuted,
  onToggleMute,
  onRestartGame,
  isGameActive,
}) => {
  const [showConfirmRestart, setShowConfirmRestart] = React.useState(false);

  const handleRestartClick = () => {
    if (isGameActive) {
      setShowConfirmRestart(true);
    } else {
      onRestartGame();
    }
  };

  const confirmRestart = () => {
    setShowConfirmRestart(false);
    onRestartGame();
  };

  const playerConfig = currentPlayer ? PLAYER_COLOR_CONFIGS[currentPlayer.colorKey] : null;

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 shadow-xs px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Title & Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 bg-clip-text text-transparent">
                Pegada Digital
              </h1>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              Privacidade de Dados & Redes Sociais
            </p>
          </div>
        </div>

        {/* Current Turn Indicator */}
        {isGameActive && currentPlayer && playerConfig && (
          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border ${playerConfig.lightBg} shadow-xs animate-pulse`}>
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Vez de:</span>
            <div className={`w-3.5 h-3.5 rounded-full ${playerConfig.bg} ring-2 ring-white shadow-xs`} />
            <span className="text-sm font-bold">{currentPlayer.name}</span>
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMute}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5 text-xs font-medium"
            title={isMuted ? 'Ativar Som' : 'Desativar Som'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
            <span className="hidden md:inline">{isMuted ? 'Mudo' : 'Som'}</span>
          </button>

          <button
            onClick={handleRestartClick}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5 text-xs font-medium"
            title="Reiniciar Jogo"
          >
            <RotateCcw className="w-4 h-4 text-slate-600" />
            <span className="hidden md:inline">Reiniciar</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal for Restarting */}
      {showConfirmRestart && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-3">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">Reiniciar partida?</h3>
            <p className="text-sm text-slate-600 mb-6">
              O progresso atual de todos os jogadores será perdido.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmRestart(false)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={confirmRestart}
                className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors shadow-md shadow-red-200 text-sm"
              >
                Reiniciar
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
