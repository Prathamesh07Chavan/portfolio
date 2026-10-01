'use client';

import { motion } from 'framer-motion';
import { ArrowDownRight, Database, LineChart, Sparkles, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/data';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function HeroSection() {
  const setCursorState = usePortfolioStore((state) => state.setCursorState);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Main Content Column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-8 flex flex-col gap-6"
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accentCyan/10 border border-accentCyan/30 text-accentCyan text-xs font-mono backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-accentEmerald animate-pulse" />
              <span>Data Analytics Intern @ Ai Variant</span>
            </div>
          </motion.div>

          {/* Staggered Name Title */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-none">
              Hello, I'm{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-accentCyan via-accentViolet to-accentEmerald">
                {PERSONAL_INFO.name}
              </span>
            </h1>
            <p className="font-mono text-sm sm:text-lg text-accentCyan/90 font-medium">
              {PERSONAL_INFO.title}
            </p>
          </motion.div>

          {/* Tagline / Pitch */}
          <motion.p variants={itemVariants} className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            {PERSONAL_INFO.tagline} {PERSONAL_INFO.summary}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => scrollTo('projects')}
              onMouseEnter={() => setCursorState(true, 'Projects')}
              onMouseLeave={() => setCursorState(false)}
              className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-accentCyan to-accentViolet text-white text-sm font-semibold hover:shadow-xl hover:shadow-accentCyan/25 hover:-translate-y-0.5 transition-all duration-300"
            >
              <LineChart className="w-4 h-4" />
              <span>Explore Analytics Projects</span>
              <ArrowDownRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollTo('contact')}
              onMouseEnter={() => setCursorState(true, 'Contact')}
              onMouseLeave={() => setCursorState(false)}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-accentCyan/40 text-gray-200 text-sm font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-accentCyan" />
              <span>Get In Touch</span>
            </button>
          </motion.div>

          {/* Data Stats Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
            {PERSONAL_INFO.stats.map((stat, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                <span className="font-heading font-extrabold text-2xl sm:text-3xl text-white block bg-clip-text text-transparent bg-gradient-to-r from-accentCyan to-accentEmerald">
                  {stat.value}
                </span>
                <span className="text-xs font-mono text-gray-400 mt-1 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Interactive Decorative Badge */}
        <div className="lg:col-span-4 hidden lg:flex flex-col items-center justify-center">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl max-w-xs text-center flex flex-col items-center gap-4 shadow-2xl shadow-accentViolet/10 hover:border-accentViolet/40 transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-accentViolet/20 border border-accentViolet/40 flex items-center justify-center text-accentViolet">
              <Database className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-white text-lg">Interactive 3D View</h3>
              <p className="text-xs text-gray-400 mt-1">
                Move your cursor to distort & tilt the procedural data mesh in real-time.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
