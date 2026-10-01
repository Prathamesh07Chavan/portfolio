'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, CheckCircle2, BookOpen, ChevronRight } from 'lucide-react';
import { PERSONAL_INFO, CERTIFICATIONS, EXPERIENCES } from '@/lib/data';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function AboutSection() {
  const setCursorState = usePortfolioStore((state) => state.setCursorState);
  const [certFilter, setCertFilter] = useState<'all' | 'core' | 'job-sim' | 'course'>('all');

  const filteredCerts = CERTIFICATIONS.filter((c) =>
    certFilter === 'all' ? true : c.category === certFilter
  );

  const education = EXPERIENCES.filter((e) => e.type === 'education');

  return (
    <section id="about" className="relative min-h-screen py-24 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center gap-16">
      
      {/* Section Header */}
      <div className="flex flex-col gap-3">
        <div className="inline-flex items-center gap-2 text-accentCyan font-mono text-xs tracking-widest uppercase">
          <span className="w-8 h-px bg-accentCyan" />
          <span>01. Background & Education</span>
        </div>
        <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
          About <span className="bg-clip-text text-transparent bg-gradient-to-r from-accentCyan to-accentViolet">Prathamesh Chavan</span>
        </h2>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Bio & Core Philosophy */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col gap-4 shadow-xl">
            <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-accentCyan" />
              <span>Professional Summary</span>
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              I am a detail-oriented and analytical Computer Engineering student at Modern Education Society's College of Engineering, Pune. My true passion lies at the intersection of <strong className="text-white">Data Analytics</strong>, <strong className="text-white">Exploratory Data Analysis (EDA)</strong>, and <strong className="text-white">Business Intelligence</strong>.
            </p>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              With experience spanning across MySQL databases, Python data structures (Pandas & NumPy), and interactive Power BI dashboards, I specialize in cleaning complex raw datasets and converting them into high-value decision-making reports.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs font-mono text-gray-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accentEmerald" />
                <span>SQL & Relational DBs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accentEmerald" />
                <span>DAX & Power Query</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accentEmerald" />
                <span>Pandas & Feature Eng.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accentEmerald" />
                <span>Tableau & Visual Storytelling</span>
              </div>
            </div>
          </div>

          {/* Education Card */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col gap-6 shadow-xl">
            <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-accentViolet" />
              <span>Academic Timeline</span>
            </h3>

            <div className="flex flex-col gap-6">
              {education.map((edu) => (
                <div key={edu.id} className="relative pl-6 border-l-2 border-accentViolet/40 flex flex-col gap-1">
                  <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-accentViolet" />
                  <span className="text-xs font-mono text-accentViolet font-semibold">{edu.period}</span>
                  <h4 className="font-heading font-bold text-white text-base">{edu.role}</h4>
                  <p className="text-xs text-gray-400 font-medium">{edu.company} • {edu.location}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Certifications Showcase */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col gap-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-accentEmerald" />
                <span>Certifications ({CERTIFICATIONS.length})</span>
              </h3>

              {/* Filter Pills */}
              <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                {(['all', 'core', 'job-sim', 'course'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setCertFilter(tab)}
                    className={`px-2.5 py-1 text-[11px] font-mono rounded-lg transition-colors capitalize ${
                      certFilter === tab
                        ? 'bg-accentEmerald text-black font-bold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Certifications Scroll List */}
            <div className="max-h-[420px] overflow-y-auto pr-2 flex flex-col gap-3 custom-scrollbar">
              {filteredCerts.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onMouseEnter={() => setCursorState(true, cert.issuer)}
                  onMouseLeave={() => setCursorState(false)}
                  className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-accentEmerald/40 transition-all flex items-center justify-between group"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-sm text-gray-200 group-hover:text-white transition-colors">
                      {cert.title}
                    </span>
                    <span className="text-xs font-mono text-accentEmerald">
                      {cert.issuer}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-accentEmerald group-hover:translate-x-1 transition-all" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
