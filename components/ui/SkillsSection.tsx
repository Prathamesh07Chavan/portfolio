'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, BarChart3, Layers, Cpu, Check } from 'lucide-react';
import { SKILL_CATEGORIES } from '@/lib/data';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function SkillsSection() {
  const setCursorState = usePortfolioStore((state) => state.setCursorState);
  const isMobile = usePortfolioStore((state) => state.isMobile);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="skills" className="relative min-h-screen py-24 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center gap-16">
      
      {/* Section Header */}
      <div className="flex flex-col gap-3">
        <div className="inline-flex items-center gap-2 text-accentViolet font-mono text-xs tracking-widest uppercase">
          <span className="w-8 h-px bg-accentViolet" />
          <span>02. Technical Capabilities</span>
        </div>
        <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
          Skills & <span className="bg-clip-text text-transparent bg-gradient-to-r from-accentViolet via-accentCyan to-accentEmerald">Toolkit</span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-xl">
          Hover over cards to interact with the 3D perspective tilt effect.
        </p>
      </div>

      {/* 3D Tilt Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {SKILL_CATEGORIES.map((cat, idx) => (
          <SkillTiltCard key={idx} category={cat} index={idx} isMobile={isMobile} setCursorState={setCursorState} variants={cardVariants} />
        ))}
      </motion.div>
    </section>
  );
}

function SkillTiltCard({ category, index, isMobile, setCursorState, variants }: any) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const card = e.currentTarget.getBoundingClientRect();
    const cardWidth = card.width;
    const cardHeight = card.height;

    const centerX = card.left + cardWidth / 2;
    const centerY = card.top + cardHeight / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rX = (mouseY / (cardHeight / 2)) * -12; // tilt max 12deg
    const rY = (mouseX / (cardWidth / 2)) * 12;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setCursorState(false);
  };

  const icons = [
    <Code className="w-6 h-6 text-accentCyan" />,
    <BarChart3 className="w-6 h-6 text-accentEmerald" />,
    <Layers className="w-6 h-6 text-accentViolet" />,
    <Cpu className="w-6 h-6 text-dataGold" />,
  ];

  return (
    <motion.div
      variants={variants}
      style={{
        perspective: 1000,
      }}
      className="w-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setCursorState(true, 'Skill')}
        animate={{
          rotateX: rotateX,
          rotateY: rotateY,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        style={{
          transformStyle: 'preserve-3d',
        }}
        className="h-full p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col gap-6 shadow-2xl hover:border-accentCyan/40 transition-colors"
      >
        {/* Card Header */}
        <div className="flex items-center gap-3" style={{ transform: 'translateZ(20px)' }}>
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10"
            style={{ backgroundColor: `${category.color}15`, borderColor: `${category.color}40` }}
          >
            {icons[index % icons.length]}
          </div>
          <div>
            <h3 className="font-heading font-bold text-white text-base leading-tight">
              {category.category}
            </h3>
            <span className="text-[11px] font-mono text-gray-400">
              {category.skills.length} Core Modules
            </span>
          </div>
        </div>

        {/* Skill Bars */}
        <div className="flex flex-col gap-4" style={{ transform: 'translateZ(10px)' }}>
          {category.skills.map((skill: any, sIdx: number) => (
            <div key={sIdx} className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-200 font-medium">{skill.name}</span>
                <span className="font-mono text-gray-400">{skill.level}%</span>
              </div>
              {/* Progress bar container */}
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: sIdx * 0.1 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: category.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
