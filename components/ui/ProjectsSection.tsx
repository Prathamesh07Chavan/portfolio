'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Sparkles, Filter, ArrowUpRight, BarChart3, Database } from 'lucide-react';
import { PROJECTS, Project } from '@/lib/data';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function ProjectsSection() {
  const setSelectedProject = usePortfolioStore((state) => state.setSelectedProject);
  const setCursorState = usePortfolioStore((state) => state.setCursorState);
  const isMobile = usePortfolioStore((state) => state.isMobile);

  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'Data Science & Python', 'Business Intelligence', 'Data Visualization', 'SQL & Tableau'];

  const filteredProjects = PROJECTS.filter((p) =>
    activeFilter === 'All' ? true : p.category === activeFilter
  );

  return (
    <section id="projects" className="relative min-h-screen py-24 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center gap-16">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 text-accentCyan font-mono text-xs tracking-widest uppercase">
            <span className="w-8 h-px bg-accentCyan" />
            <span>03. Featured Work</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
            Analytics & BI <span className="bg-clip-text text-transparent bg-gradient-to-r from-accentCyan to-accentEmerald">Projects</span>
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3.5 py-1.5 text-xs font-mono rounded-xl transition-all ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-accentCyan to-accentViolet text-white font-semibold shadow-lg shadow-accentCyan/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project, idx) => (
          <ProjectTiltCard
            key={project.id}
            project={project}
            index={idx}
            isMobile={isMobile}
            setSelectedProject={setSelectedProject}
            setCursorState={setCursorState}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectTiltCard({ project, index, isMobile, setSelectedProject, setCursorState }: any) {
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

    const rX = (mouseY / (cardHeight / 2)) * -10;
    const rY = (mouseX / (cardWidth / 2)) * 10;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setCursorState(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
      className="w-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setCursorState(true, 'View Details')}
        onClick={() => setSelectedProject(project)}
        animate={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="group relative h-full p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col justify-between gap-6 cursor-pointer hover:border-accentCyan/50 transition-all shadow-2xl overflow-hidden"
      >
        {/* Ambient Gradient Glow Background */}
        <div
          className="absolute -right-20 -top-20 w-56 h-56 rounded-full blur-3xl opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"
          style={{ backgroundColor: project.color }}
        />

        {/* Card Header */}
        <div className="flex flex-col gap-3" style={{ transform: 'translateZ(20px)' }}>
          <div className="flex items-center justify-between">
            <span
              className="text-xs font-mono px-3 py-1 rounded-full border"
              style={{
                color: project.color,
                borderColor: `${project.color}50`,
                backgroundColor: `${project.color}15`,
              }}
            >
              {project.category}
            </span>
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 group-hover:text-white group-hover:bg-accentCyan group-hover:border-accentCyan transition-all">
              <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            </div>
          </div>

          <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white group-hover:text-accentCyan transition-colors">
            {project.title}
          </h3>

          <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10" style={{ transform: 'translateZ(10px)' }}>
          {project.metrics.map((m: any, idx: number) => (
            <div key={idx} className="flex flex-col">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-tighter truncate">{m.label}</span>
              <span className="font-heading font-bold text-xs sm:text-sm text-white mt-0.5" style={{ color: project.color }}>
                {m.value}
              </span>
            </div>
          ))}
        </div>

        {/* Card Footer Tools */}
        <div className="flex items-center justify-between pt-2" style={{ transform: 'translateZ(15px)' }}>
          <div className="flex flex-wrap gap-1.5">
            {project.tools.slice(0, 4).map((tool: string, tIdx: number) => (
              <span key={tIdx} className="px-2.5 py-0.5 rounded-md bg-white/5 text-[11px] font-mono text-gray-400 border border-white/5">
                {tool}
              </span>
            ))}
          </div>

          <span className="text-xs font-mono text-accentCyan flex items-center gap-1 group-hover:underline">
            Details →
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
