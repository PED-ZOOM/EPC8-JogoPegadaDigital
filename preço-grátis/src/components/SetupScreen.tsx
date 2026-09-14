import React, { useState } from 'react';
import { Users, Play, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react';
import { Player, PlayerColorKey } from '../types';
import { PLAYER_COLOR_CONFIGS } from '../data/spaces';

interface SetupScreenProps {
  onStartGame: (players: Player[]) => void;
}

const DEFAULT_NAMES = ['Ana', 'Bruno', 'Carla', 'Diego'];

const FIXED_COLORS: PlayerColorKey[] = ['red', 'blue', 'green', 'yellow'];

export const SetupScreen: React.FC<SetupScreenProps> = ({ onStartGame }) => {
  const [numPlayers, setNumPlayers] = useState<number>(2);
  const [playerNames, setPlayerNames] = useState<string[]>(DEFAULT_NAMES);

  const handleNumPlayersChange = (count: number) => {
    setNumPlayers(count);
  };

  const handleNameChange = (index: number, value: string) => {
    const updated = [...playerNames];
    updated[index] = value;
    setPlayerNames(updated);
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    const players: Player[] = [];

    for (let i = 0; i < numPlayers; i++) {
      const colorKey = FIXED_COLORS[i];
      const config = PLAYER_COLOR_CONFIGS[colorKey];
      const nameInput = playerNames[i]?.trim();
      const name = nameInput || `Jogador ${i + 1}`;

      players.push({
        id: i + 1,
        name,
        colorKey,
        hexColor: config.hex,
        badgeBgClass: config.badgeBgClass,
        badgeTextClass: config.badgeTextClass,
        position: 0,
        vantagem: 0,
        rastro: 0,
        isFinished: false,
      });
    }

    onStartGame(players);
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 my-4">
        
        {/* Banner Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            Jogo Educativo
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            Pegada Digital
          </h2>
        </div>

        <form onSubmit={handleStart} className="space-y-6">
          {/* Player Count Selection */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" />
              Número de Jogadores:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[2, 3, 4].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => handleNumPlayersChange(count)}
                  className={`py-3 px-4 rounded-2xl font-bold text-base transition-all flex flex-col items-center justify-center border ${
                    numPlayers === count
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200 scale-102'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{count} Jogadores</span>
                </button>
              ))}
            </div>
          </div>

          {/* Player Names with Fixed Colors */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-800">
              Nome dos Participantes:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Array.from({ length: numPlayers }).map((_, idx) => {
                const colorKey = FIXED_COLORS[idx];
                const config = PLAYER_COLOR_CONFIGS[colorKey];
                const initial = playerNames[idx]?.trim().substring(0, 1).toUpperCase() || `${idx + 1}`;

                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl border ${config.lightBg} flex items-center gap-3 transition-all`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full ${config.bg} text-white font-extrabold text-lg flex items-center justify-center shadow-md shrink-0`}
                    >
                      {initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold opacity-75 mb-0.5">
                        Jogador {idx + 1} ({config.name})
                      </div>
                      <input
                        type="text"
                        value={playerNames[idx]}
                        onChange={(e) => handleNameChange(idx, e.target.value)}
                        placeholder={`Nome do Jogador ${idx + 1}`}
                        className="w-full bg-white/90 border border-slate-200 rounded-xl px-3 py-1.5 text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        maxLength={18}
                        required
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Rules Legend */}
          <div className="bg-slate-100/80 rounded-2xl p-4 border border-slate-200 text-xs text-slate-700 space-y-2">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              Como Funciona o Placar?
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="bg-white p-2.5 rounded-xl border border-emerald-200 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center">V</span>
                <div>
                  <span className="font-bold text-emerald-800">Vantagem:</span>
                  <p className="text-[11px] text-slate-600 leading-tight">Conveniência e entretenimento do app.</p>
                </div>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-amber-200 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-amber-500 text-white font-extrabold text-xs flex items-center justify-center">R</span>
                <div>
                  <span className="font-bold text-amber-800">Rastro:</span>
                  <p className="text-[11px] text-slate-600 leading-tight">Coleta de dados pessoais sobre você.</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-amber-700 font-medium pt-1">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-amber-600" />
              O saldo final só é calculado e revelado no término do jogo!
            </div>
          </div>

          {/* Start Button */}
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-extrabold text-lg shadow-xl shadow-indigo-200 hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-6 h-6 fill-white" />
            Iniciar Partida
          </button>
        </form>
      </div>
    </div>
  );
};
