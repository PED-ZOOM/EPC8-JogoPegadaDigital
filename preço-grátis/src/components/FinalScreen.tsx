import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Player, EndSequenceStep } from '../types';
import { PLAYER_COLOR_CONFIGS } from '../data/spaces';
import { soundManager } from '../utils/audio';
import { Trophy, ArrowRight, ShieldAlert, Award, Sparkles, RotateCcw, HeartHandshake, Eye } from 'lucide-react';

interface FinalScreenProps {
  players: Player[];
  onRestartGame: () => void;
}

// Dossier text evaluator based on Rastro
const getDossierText = (rastro: number): { text: string; alertLevel: string; badgeBg: string } => {
  if (rastro <= 60) {
    return {
      text: 'Perfil vago — não dá para saber quem é você',
      alertLevel: 'Baixo Rastro (Muito Protegido)',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    };
  } else if (rastro <= 150) {
    return {
      text: 'Sabem sua idade e seus gostos',
      alertLevel: 'Rastro Moderado',
      badgeBg: 'bg-blue-100 text-blue-800 border-blue-300',
    };
  } else if (rastro <= 280) {
    return {
      text: 'Sabem onde você mora, estuda e qual é sua rotina',
      alertLevel: 'Rastro Alto (Alta Exposição)',
      badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
    };
  } else {
    return {
      text: 'Sabem sua família, seus horários, seu rosto e o que você compra',
      alertLevel: 'Dossiê Completo (Exposição Total)',
      badgeBg: 'bg-red-100 text-red-800 border-red-300',
    };
  }
};

export const FinalScreen: React.FC<FinalScreenProps> = ({ players, onRestartGame }) => {
  const [currentStep, setCurrentStep] = useState<EndSequenceStep>('DOSSIERS');

  // Trigger confetti for initial rendering or step changes
  useEffect(() => {
    if (currentStep === 'RANKING_VANTAGEM') {
      soundManager.playFanfare();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else if (currentStep === 'RANKING_WINNER') {
      soundManager.playFanfare();
      // Grand celebration burst
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });

        if (Date.now() < animationEnd) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [currentStep]);

  // Ranking calculation
  const sortedByVantagem = [...players].sort((a, b) => b.vantagem - a.vantagem);
  const sortedByRastro = [...players].sort((a, b) => a.rastro - b.rastro); // Less rastro is better
  const sortedBySaldo = [...players].sort((a, b) => {
    const saldoA = a.vantagem - a.rastro;
    const saldoB = b.vantagem - b.rastro;
    if (saldoB !== saldoA) {
      return saldoB - saldoA; // Highest saldo wins
    }
    return a.rastro - b.rastro; // Tie breaker: less rastro
  });

  const winner = sortedBySaldo[0];

  const handleNext = () => {
    if (currentStep === 'DOSSIERS') {
      setCurrentStep('RANKING_VANTAGEM');
    } else if (currentStep === 'RANKING_VANTAGEM') {
      setCurrentStep('RANKING_RASTRO');
    } else if (currentStep === 'RANKING_RASTRO') {
      setCurrentStep('RANKING_WINNER');
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-slate-900 flex items-center justify-center p-4 sm:p-6 text-white">
      <div className="max-w-3xl w-full bg-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-700 my-4">
        
        {/* Step 1: DOSSIERS */}
        {currentStep === 'DOSSIERS' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Relatório de Dados
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {players.map((p) => {
                const config = PLAYER_COLOR_CONFIGS[p.colorKey];
                const dossier = getDossierText(p.rastro);

                return (
                  <div
                    key={p.id}
                    className="bg-slate-900/80 rounded-2xl p-5 border border-slate-700/80 flex flex-col justify-between shadow-lg"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-8 h-8 rounded-full ${config.bg} text-white font-black text-sm flex items-center justify-center ring-2 ring-white/20`}
                          >
                            {p.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-extrabold text-lg text-white">{p.name}</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${dossier.badgeBg}`}>
                          {dossier.alertLevel}
                        </span>
                      </div>

                      <div className="bg-slate-800/90 rounded-xl p-3.5 border border-slate-700 mb-3">
                        <p className="text-sm font-extrabold text-amber-300 italic">
                          "{dossier.text}"
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs font-bold pt-2 border-t border-slate-700/60 text-slate-300">
                      <span>Vantagem: <strong className="text-emerald-400">+{p.vantagem}</strong></span>
                      <span>Rastro: <strong className="text-amber-400">{p.rastro}</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleNext}
              className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-lg shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Ver Rankings da Partida</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Step 2: RANKING_VANTAGEM */}
        {currentStep === 'RANKING_VANTAGEM' && (
          <div className="space-y-6 animate-in fade-in duration-300 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                Primeiro Critério
              </span>
              <h2 className="text-3xl font-black text-white">
                Quem Acumulou Mais Vantagem?
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Jogadores que mais aproveitaram os serviços, curtidas e facilidades das redes:
              </p>
            </div>

            <div className="space-y-3 max-w-md mx-auto text-left">
              {sortedByVantagem.map((p, rank) => {
                const config = PLAYER_COLOR_CONFIGS[p.colorKey];
                return (
                  <div
                    key={p.id}
                    className={`p-4 rounded-2xl border flex items-center justify-between ${
                      rank === 0
                        ? 'bg-emerald-500/10 border-emerald-500/50 text-white shadow-lg'
                        : 'bg-slate-900/60 border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-black text-lg w-6 text-center text-slate-400">
                        #{rank + 1}
                      </span>
                      <div className={`w-8 h-8 rounded-full ${config.bg} text-white font-bold flex items-center justify-center`}>
                        {p.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-bold text-base">{p.name}</span>
                    </div>

                    <span className="font-black text-lg text-emerald-400">
                      +{p.vantagem} V
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleNext}
              className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-lg shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer max-w-md mx-auto"
            >
              <span>Próximo: Ranking de Rastro</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Step 3: RANKING_RASTRO */}
        {currentStep === 'RANKING_RASTRO' && (
          <div className="space-y-6 animate-in fade-in duration-300 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                Segundo Critério
              </span>
              <h2 className="text-3xl font-black text-white">
                Quem Deixou Menos Rastro?
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Jogadores que mais protegeram sua privacidade e exposição na internet:
              </p>
            </div>

            <div className="space-y-3 max-w-md mx-auto text-left">
              {sortedByRastro.map((p, rank) => {
                const config = PLAYER_COLOR_CONFIGS[p.colorKey];
                return (
                  <div
                    key={p.id}
                    className={`p-4 rounded-2xl border flex items-center justify-between ${
                      rank === 0
                        ? 'bg-amber-500/10 border-amber-500/50 text-white shadow-lg'
                        : 'bg-slate-900/60 border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-black text-lg w-6 text-center text-slate-400">
                        #{rank + 1}
                      </span>
                      <div className={`w-8 h-8 rounded-full ${config.bg} text-white font-bold flex items-center justify-center`}>
                        {p.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-bold text-base">{p.name}</span>
                    </div>

                    <span className="font-black text-lg text-amber-400">
                      {p.rastro} R
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleNext}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-lg shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer max-w-md mx-auto"
            >
              <span>Revelar o Vencedor (Saldo)</span>
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </button>
          </div>
        )}

        {/* Step 4: RANKING_WINNER (O VENDEDOR - Saldo = Vantagem - Rastro) */}
        {currentStep === 'RANKING_WINNER' && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500 text-center">
            {/* Winner Trophy Header */}
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 text-slate-900 flex items-center justify-center mx-auto shadow-2xl shadow-yellow-500/40 border-2 border-yellow-200 animate-bounce">
                <Trophy className="w-14 h-14" />
              </div>
            </div>

            <div>
              <span className="text-xs font-black text-yellow-400 uppercase tracking-widest block mb-1">
                Grande Vencedor(a) por Saldo (Vantagem − Rastro)
              </span>
              <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 bg-clip-text text-transparent">
                {winner.name}!
              </h2>
              <p className="text-slate-300 text-sm mt-2 max-w-md mx-auto">
                Conseguiu equilibrar melhor as vantagens dos aplicativos sem entregar toda a sua privacidade!
              </p>
            </div>

            {/* Complete Final Standings List */}
            <div className="bg-slate-900/90 rounded-3xl p-5 border border-slate-700/80 space-y-3 text-left">
              <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">
                Classificação Final pelo Saldo (Vantagem − Rastro):
              </h4>

              {sortedBySaldo.map((p, rank) => {
                const config = PLAYER_COLOR_CONFIGS[p.colorKey];
                const saldo = p.vantagem - p.rastro;
                const isWinner = rank === 0;

                return (
                  <div
                    key={p.id}
                    className={`p-4 rounded-2xl border flex items-center justify-between ${
                      isWinner
                        ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/10 border-yellow-500/60 ring-2 ring-yellow-400/40 text-white shadow-xl'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`font-black text-xl w-7 text-center ${isWinner ? 'text-yellow-400' : 'text-slate-500'}`}>
                        #{rank + 1}
                      </span>
                      <div className={`w-9 h-9 rounded-full ${config.bg} text-white font-extrabold flex items-center justify-center shadow-md`}>
                        {p.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-extrabold text-base flex items-center gap-2">
                          <span>{p.name}</span>
                          {isWinner && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-400 text-slate-900 uppercase">
                              Campeão
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 font-medium">
                          +{p.vantagem} V  •  {p.rastro} R
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-slate-400 block font-semibold">
                        Saldo Final:
                      </span>
                      <span className={`font-black text-xl ${saldo >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {saldo > 0 ? `+${saldo}` : saldo}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Restart Game Button */}
            <button
              onClick={onRestartGame}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:scale-[1.01] text-white font-black text-lg shadow-xl shadow-indigo-900/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Jogar Novamente</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
