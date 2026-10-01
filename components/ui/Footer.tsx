'use client';

import { ArrowUp, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/data';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function Footer() {
  const setCursorState = usePortfolioStore((state) => state.setCursorState);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#05070E]/80 backdrop-blur-xl py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left Brand */}
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-accentCyan" />
          <span className="text-xs font-mono text-gray-400">
            © {new Date().getFullYear()} {PERSONAL_INFO.name} • All Rights Reserved.
          </span>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          onMouseEnter={() => setCursorState(true, 'Top')}
          onMouseLeave={() => setCursorState(false)}
          className="flex items-center gap-2 text-xs font-mono text-accentCyan hover:text-accentEmerald transition-colors p-2 rounded-xl bg-white/5 border border-white/10"
        >
          <span>Back to top</span>
          <ArrowUp className="w-4 h-4" />
        </button>

      </div>
    </footer>
  );
}
