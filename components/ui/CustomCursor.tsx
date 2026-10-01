'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const cursorState = usePortfolioStore((state) => state.cursorState);
  const isMobile = usePortfolioStore((state) => state.isMobile);

  useEffect(() => {
    if (isMobile) return;

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Small dot follower */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-accentCyan rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: cursorState.hovered ? 2.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 35, mass: 0.1 }}
      />

      {/* Larger trailing halo */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-accentCyan/50 pointer-events-none z-50 flex items-center justify-center text-[10px] font-semibold text-accentCyan bg-accentCyan/5"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: cursorState.hovered ? 1.8 : 1,
          borderColor: cursorState.hovered ? '#8B5CF6' : 'rgba(6, 182, 212, 0.5)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {cursorState.text && (
          <span className="scale-75 uppercase tracking-tighter font-mono">
            {cursorState.text}
          </span>
        )}
      </motion.div>
    </>
  );
}
