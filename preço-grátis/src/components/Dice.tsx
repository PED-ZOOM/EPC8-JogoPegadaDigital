import React, { useState } from 'react';
import { soundManager } from '../utils/audio';

interface DiceProps {
  onRoll: (result: number) => void;
  disabled: boolean;
  currentPlayerName: string;
  currentPlayerHexColor: string;
}

export const Dice: React.FC<DiceProps> = ({
  onRoll,
  disabled,
  currentPlayerName,
  currentPlayerHexColor,
}) => {
  const [isRolling, setIsRolling] = useState(false);
  const [diceValue, setDiceValue] = useState<number>(1);

  const handleRoll = () => {
    if (disabled || isRolling) return;

    setIsRolling(true);
    soundManager.playDiceRoll();

    // Roll animation sequence over 700ms
    let count = 0;
    const interval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count > 10) {
        clearInterval(interval);
        const finalVal = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalVal);
        setIsRolling(false);
        onRoll(finalVal);
      }
    }, 60);
  };

  // Helper function to render dice pips
  const renderPips = (val: number) => {
    const pipPositions: Record<number, string[]> = {
      1: ['col-start-2 row-start-2'],
      2: ['col-start-1 row-start-1', 'col-start-3 row-start-3'],
      3: ['col-start-1 row-start-1', 'col-start-2 row-start-2', 'col-start-3 row-start-3'],
      4: ['col-start-1 row-start-1', 'col-start-3 row-start-1', 'col-start-1 row-start-3', 'col-start-3 row-start-3'],
      5: [
        'col-start-1 row-start-1',
        'col-start-3 row-start-1',
        'col-start-2 row-start-2',
        'col-start-1 row-start-3',
        'col-start-3 row-start-3',
      ],
      6: [
        'col-start-1 row-start-1',
        'col-start-3 row-start-1',
        'col-start-1 row-start-2',
        'col-start-3 row-start-2',
        'col-start-1 row-start-3',
        'col-start-3 row-start-3',
      ],
    };

    return (
      <div className="grid grid-cols-3 grid-rows-3 w-12 h-12 p-2">
        {(pipPositions[val] || []).map((pos, idx) => (
          <div key={idx} className={`w-2.5 h-2.5 rounded-full bg-slate-800 justify-self-center self-center shadow-xs ${pos}`} />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <button
        onClick={handleRoll}
        disabled={disabled || isRolling}
        className={`group relative p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-xl transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
          disabled
            ? 'opacity-50 cursor-not-allowed scale-95'
            : 'hover:scale-105 hover:shadow-2xl hover:border-indigo-400 active:scale-95 cursor-pointer'
        }`}
        style={{
          boxShadow: disabled ? 'none' : `0 10px 25px -5px ${currentPlayerHexColor}40`,
        }}
      >
        {/* Animated Dice Cube */}
        <div
          className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-slate-300 flex items-center justify-center shadow-inner transition-transform duration-100 ${
            isRolling ? 'animate-bounce rotate-12 scale-110' : ''
          }`}
        >
          {renderPips(diceValue)}
        </div>

        <div className="text-center">
          <span
            className="text-xs font-black uppercase tracking-wider block"
            style={{ color: currentPlayerHexColor }}
          >
            Rolar Dado
          </span>
          <span className="text-[10px] text-slate-500 font-semibold">
            {isRolling ? 'Rolando...' : disabled ? 'Aguarde a jogada' : 'Clique para jogar'}
          </span>
        </div>
      </button>

      {!disabled && !isRolling && (
        <div className="text-xs font-bold text-slate-700 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full border border-slate-200 shadow-xs flex items-center gap-1.5 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Vez de <strong>{currentPlayerName}</strong> rolar!</span>
        </div>
      )}
    </div>
  );
};
