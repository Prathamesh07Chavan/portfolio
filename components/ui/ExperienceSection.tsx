'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, UserCheck, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCES } from '@/lib/data';
import { usePortfolioStore } from '@/store/usePortfolioStore';

gsap.registerPlugin(ScrollTrigger);

export function ExperienceSection() {
  const setCursorState = usePortfolioStore((state) => state.setCursorState);
  const isMobile = usePortfolioStore((state) => state.isMobile);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile || !lineRef.current || !timelineRef.current) return;

    // GSAP ScrollTrigger timeline progress bar animation
    const anim = gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: true,
        },
      }
    );

    return () => {
      anim.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [isMobile]);

  const workExp = EXPERIENCES.filter((e) => e.type !== 'education');

  return (
    <section id="experience" className="relative min-h-screen py-24 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center gap-16">
      
      {/* Section Header */}
      <div className="flex flex-col gap-3">
        <div className="inline-flex items-center gap-2 text-accentEmerald font-mono text-xs tracking-widest uppercase">
          <span className="w-8 h-px bg-accentEmerald" />
          <span>04. Professional Journey</span>
        </div>
        <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
          Experience & <span className="bg-clip-text text-transparent bg-gradient-to-r from-accentEmerald via-accentCyan to-accentViolet">Leadership</span>
        </h2>
      </div>

      {/* Timeline Wrapper */}
      <div ref={timelineRef} className="relative flex flex-col gap-12 max-w-4xl mx-auto w-full">
        {/* Animated GSAP Timeline Progress Line */}
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2">
          <div
            ref={lineRef}
            className="w-full h-full bg-gradient-to-b from-accentCyan via-accentViolet to-accentEmerald origin-top"
          />
        </div>

        {/* Timeline Items */}
        {workExp.map((item, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: isEven ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              onMouseEnter={() => setCursorState(true, item.company)}
              onMouseLeave={() => setCursorState(false)}
              className={`relative flex flex-col sm:flex-row items-start ${
                isEven ? 'sm:flex-row-reverse' : ''
              } gap-8 w-full`}
            >
              {/* Timeline Center Node */}
              <div className="absolute left-4 sm:left-1/2 top-6 -translate-x-1/2 w-8 h-8 rounded-full bg-[#05070E] border-2 border-accentCyan flex items-center justify-center z-10 shadow-lg shadow-accentCyan/30">
                <div className="w-2.5 h-2.5 rounded-full bg-accentCyan animate-ping" />
              </div>

              {/* Card Container */}
              <div className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${isEven ? 'sm:pr-12' : 'sm:pl-12'}`}>
                <div className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col gap-4 shadow-xl hover:border-accentEmerald/40 transition-colors">
                  
                  {/* Period & Role */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs font-mono text-accentEmerald">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.period}</span>
                      <span>•</span>
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.location}</span>
                    </div>

                    <h3 className="font-heading font-extrabold text-xl text-white">
                      {item.role}
                    </h3>
                    <span className="text-sm font-semibold text-accentCyan">
                      {item.company}
                    </span>
                  </div>

                  {/* Bullet points */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                    {item.description.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-accentCyan shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
