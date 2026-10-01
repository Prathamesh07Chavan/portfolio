'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, Cpu, BarChart2 } from 'lucide-react';
import { Project } from '@/lib/data';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function ProjectModal() {
  const selectedProject = usePortfolioStore((state) => state.selectedProject);
  const setSelectedProject = usePortfolioStore((state) => state.setSelectedProject);
  const setCursorState = usePortfolioStore((state) => state.setCursorState);

  return (
    <AnimatePresence>
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-[#05070E]/80 backdrop-blur-xl"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl rounded-3xl bg-[#0B0F1D] border border-white/10 p-6 sm:p-8 shadow-2xl z-10 my-auto flex flex-col gap-6 max-h-[90vh] overflow-y-auto custom-scrollbar"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              onMouseEnter={() => setCursorState(true, 'Close')}
              onMouseLeave={() => setCursorState(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Title & Category */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-accentCyan/10 border border-accentCyan/30 text-accentCyan w-fit">
                {selectedProject.category}
              </span>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                {selectedProject.title}
              </h3>
            </div>

            {/* Long Description */}
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {selectedProject.longDescription}
            </p>

            {/* Key Metrics Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {selectedProject.metrics.map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col">
                  <span className="text-xs font-mono text-gray-400">{m.label}</span>
                  <span className="font-heading font-bold text-lg text-accentCyan mt-0.5">{m.value}</span>
                </div>
              ))}
            </div>

            {/* Detailed Bullets */}
            <div className="flex flex-col gap-3 pt-2">
              <h4 className="font-heading font-bold text-white text-base flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-accentEmerald" />
                <span>Technical Execution & Highlights</span>
              </h4>
              <div className="flex flex-col gap-2">
                {selectedProject.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-accentEmerald shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Used */}
            <div className="flex flex-wrap gap-2 pt-2">
              {selectedProject.tools.map((tool, tIdx) => (
                <span
                  key={tIdx}
                  className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-300"
                >
                  {tool}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorState(true, 'GitHub')}
                onMouseLeave={() => setCursorState(false)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accentCyan to-accentViolet text-white text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                <Github className="w-4 h-4" />
                <span>View GitHub Repository</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
