import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FloatingPoint } from '../types';

interface FloatingPointsProps {
  items: FloatingPoint[];
}

export const FloatingPoints: React.FC<FloatingPointsProps> = ({ items }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {items.map((item) => {
          const isVantagem = item.type === 'vantagem';
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.5, y: item.y, x: item.x }}
              animate={{ opacity: 1, scale: 1.2, y: item.y - 80 }}
              exit={{ opacity: 0, scale: 0.8, y: item.y - 120 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className={`absolute font-black text-2xl drop-shadow-lg px-3 py-1 rounded-xl border ${
                isVantagem
                  ? 'bg-emerald-500 text-white border-emerald-300 shadow-emerald-300/50'
                  : 'bg-amber-500 text-white border-amber-300 shadow-amber-300/50'
              }`}
            >
              {item.text}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
