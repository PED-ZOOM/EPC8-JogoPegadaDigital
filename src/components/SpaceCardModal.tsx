import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BoardSpace, Choice, Player, AutoResult } from '../types';
import { soundManager } from '../utils/audio';
import { Shield, Sparkles, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

interface SpaceCardModalProps {
  isOpen: boolean;
  space: BoardSpace | null;
  player: Player | null;
  autoResult?: AutoResult | null;
  onChoiceSelected: (choice: Choice) => void;
  onAutoConfirm: (result: { vantagem: number; rastro: number }) => void;
}

export const SpaceCardModal: React.FC<SpaceCardModalProps> = ({
  isOpen,
  space,
  player,
  autoResult,
  onChoiceSelected,
  onAutoConfirm,
}) => {
  if (!isOpen || !space || !player) return null;

  const handleChoiceClick = (choice: Choice) => {
    soundManager.playCardFlip();
    if (choice.vantagem > 0 || choice.rastro < 0) {
      soundManager.playPointGain();
    } else if (choice.vantagem < 0 || choice.rastro > 0) {
      soundManager.playPointLoss();
    }
    onChoiceSelected(choice);
  };

  const handleAutoClick = () => {
    soundManager.playCardFlip();
    if (autoResult) {
      if (autoResult.vantagem > 0) {
        soundManager.playPointGain();
      } else if (autoResult.vantagem < 0) {
        soundManager.playPointLoss();
      }
      onAutoConfirm({ vantagem: autoResult.vantagem, rastro: autoResult.rastro });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
          transition={{ type: 'spring', damping: 22, stiffness: 260 }}
          className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden relative"
        >
          {/* Header Tag with Space Number */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-2xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-md">
                {space.id}
              </span>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Casa {space.id} / 30
                </span>
                <span className="text-sm font-extrabold text-indigo-700">
                  {space.category.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Active Player Badge */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
              <div
                className="w-3.5 h-3.5 rounded-full ring-2 ring-white shadow-xs"
                style={{ backgroundColor: player.hexColor }}
              />
              <span className="text-xs font-bold text-slate-800">{player.name}</span>
            </div>
          </div>

          {/* Title & Description */}
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
              {space.title}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              {space.description}
            </p>
          </div>

          {/* Choice Options Mode */}
          {space.type === 'choice' && space.choices && (
            <div className="space-y-3">
              <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                Qual é a sua decisão?
              </div>

              {space.choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoiceClick(choice)}
                  className="w-full text-left p-4 rounded-2xl border-2 border-slate-200 hover:border-indigo-500 bg-white hover:bg-indigo-50/50 transition-all duration-200 group flex items-center justify-between gap-3 shadow-xs hover:shadow-md active:scale-[0.99] cursor-pointer"
                >
                  <div className="flex-1">
                    <span className="font-extrabold text-sm sm:text-base text-slate-800 group-hover:text-indigo-900 block mb-1">
                      {choice.text}
                    </span>
                    <div className="flex items-center gap-3 text-xs font-bold">
                      <span className={choice.vantagem >= 0 ? 'text-emerald-600' : 'text-red-600'}>
                        Vantagem: {choice.vantagem > 0 ? `+${choice.vantagem}` : choice.vantagem}
                      </span>
                      <span className={choice.rastro <= 0 ? 'text-emerald-600' : 'text-amber-600'}>
                        Rastro: {choice.rastro > 0 ? `+${choice.rastro}` : choice.rastro}
                      </span>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white text-slate-400 flex items-center justify-center transition-colors shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Automatic Space Mode */}
          {space.type === 'automatic' && autoResult && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-900">
                <p className="text-sm font-semibold leading-snug">
                  {autoResult.message}
                </p>
                
                <div className="mt-3 pt-3 border-t border-amber-200 flex items-center gap-4 text-xs font-extrabold">
                  <span className={autoResult.vantagem >= 0 ? 'text-emerald-700' : 'text-red-700'}>
                    Impacto Vantagem: {autoResult.vantagem > 0 ? `+${autoResult.vantagem}` : autoResult.vantagem}
                  </span>
                  <span className={autoResult.rastro <= 0 ? 'text-emerald-700' : 'text-amber-800'}>
                    Impacto Rastro: {autoResult.rastro > 0 ? `+${autoResult.rastro}` : autoResult.rastro}
                  </span>
                </div>
              </div>

              <button
                onClick={handleAutoClick}
                className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-base shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continuar Jogo</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          <div className="mt-4 pt-3 text-center border-t border-slate-100">
            <span className="text-[11px] font-semibold text-slate-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
              Pegada Digital — Lembre-se: dados compartilhados não voltam atrás!
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
