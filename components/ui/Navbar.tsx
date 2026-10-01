'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, Terminal, Sparkles } from 'lucide-react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { PERSONAL_INFO } from '@/lib/data';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar() {
  const activeSection = usePortfolioStore((state) => state.activeSection);
  const audioEnabled = usePortfolioStore((state) => state.audioEnabled);
  const toggleAudio = usePortfolioStore((state) => state.toggleAudio);
  const setCursorState = usePortfolioStore((state) => state.setCursorState);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 py-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between backdrop-blur-xl bg-[#05070E]/65 border border-white/10 rounded-2xl px-5 py-3 shadow-2xl shadow-accentCyan/5">
        
        {/* Brand / Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          onMouseEnter={() => setCursorState(true, 'Home')}
          onMouseLeave={() => setCursorState(false)}
          className="flex items-center gap-3 text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accentCyan/20 via-accentViolet/20 to-accentEmerald/20 border border-accentCyan/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <Terminal className="w-5 h-5 text-accentCyan group-hover:text-accentEmerald transition-colors" />
          </div>
          <div>
            <span className="font-heading font-bold text-base text-white tracking-wide block">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-[11px] font-mono text-accentCyan flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accentEmerald animate-pulse" />
              Data Analytics Specialist
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setCursorState(true, item.label)}
                onMouseLeave={() => setCursorState(false)}
                className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-gradient-to-r from-accentCyan/30 to-accentViolet/30 border border-accentCyan/50 rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sound Toggle & Action CTAs */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleAudio}
            onMouseEnter={() => setCursorState(true, audioEnabled ? 'Mute' : 'Audio')}
            onMouseLeave={() => setCursorState(false)}
            aria-label="Toggle ambient audio"
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-accentCyan hover:border-accentCyan/40 transition-all duration-300"
          >
            {audioEnabled ? (
              <Volume2 className="w-4 h-4 text-accentCyan animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 text-gray-400" />
            )}
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            onMouseEnter={() => setCursorState(true, 'Hire')}
            onMouseLeave={() => setCursorState(false)}
            className="hidden sm:flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-accentCyan to-accentViolet hover:opacity-90 rounded-xl transition-all duration-300 shadow-lg shadow-accentCyan/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-3 max-w-7xl mx-auto backdrop-blur-2xl bg-[#05070E]/95 border border-white/10 rounded-2xl p-5 shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    activeSection === item.id
                      ? 'bg-accentCyan/20 text-accentCyan border border-accentCyan/30'
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
