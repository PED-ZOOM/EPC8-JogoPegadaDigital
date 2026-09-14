import React from 'react';
import { Player } from '../types';
import { PLAYER_COLOR_CONFIGS } from '../data/spaces';
import { Shield, Sparkles, CheckCircle2 } from 'lucide-react';

interface ScoreboardProps {
  players: Player[];
  currentPlayerId: number;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ players, currentPlayerId }) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md border border-slate-200">
      <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
        <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          Placar dos Jogadores
        </h3>
        <span className="text-[11px] font-semibold text-slate-400">
          Vantagem (V) vs. Rastro (R)
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {players.map((p) => {
          const config = PLAYER_COLOR_CONFIGS[p.colorKey];
          const isCurrentTurn = p.id === currentPlayerId;
          const initial = p.name.charAt(0).toUpperCase();

          return (
            <div
              key={p.id}
              className={`p-3 rounded-xl border transition-all duration-300 relative overflow-hidden ${
                isCurrentTurn
                  ? `${config.lightBg} ring-2 ${config.ring} shadow-md scale-[1.02]`
                  : 'bg-slate-50/80 border-slate-200 opacity-90'
              }`}
            >
              {/* Turn indicator glow tag */}
              {isCurrentTurn && (
                <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-lg shadow-xs uppercase tracking-wider">
                  Sua Vez
                </div>
              )}

              {/* Player Name and Avatar */}
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`w-7 h-7 rounded-full ${config.bg} text-white font-black text-xs flex items-center justify-center shadow-xs shrink-0`}
                >
                  {initial}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-xs text-slate-800 truncate" title={p.name}>
                    {p.name}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                    {p.isFinished ? (
                      <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" /> Fim (Casa 30)
                      </span>
                    ) : (
                      <span>Casa {p.position} / 30</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Score Badges: Vantagem (V) and Rastro (R) ONLY */}
              <div className="grid grid-cols-2 gap-1.5 text-center">
                <div className="bg-emerald-50 border border-emerald-200/80 rounded-lg py-1 px-1.5">
                  <div className="text-[9px] font-extrabold text-emerald-700 uppercase tracking-tight">
                    Vantagem
                  </div>
                  <div className="text-sm font-extrabold text-emerald-800 leading-tight">
                    {p.vantagem > 0 ? `+${p.vantagem}` : p.vantagem}
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200/80 rounded-lg py-1 px-1.5">
                  <div className="text-[9px] font-extrabold text-amber-700 uppercase tracking-tight flex items-center justify-center gap-0.5">
                    <Shield className="w-2.5 h-2.5" />
                    Rastro
                  </div>
                  <div className="text-sm font-extrabold text-amber-800 leading-tight">
                    {p.rastro}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
