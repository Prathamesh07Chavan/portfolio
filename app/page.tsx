'use client';

import { useMousePosition } from '@/hooks/useMousePosition';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useResponsiveCanvas } from '@/hooks/useResponsiveCanvas';

import { CanvasContainer } from '@/components/canvas/CanvasContainer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Navbar } from '@/components/ui/Navbar';
import { HeroSection } from '@/components/ui/HeroSection';
import { AboutSection } from '@/components/ui/AboutSection';
import { SkillsSection } from '@/components/ui/SkillsSection';
import { ProjectsSection } from '@/components/ui/ProjectsSection';
import { ProjectModal } from '@/components/ui/ProjectModal';
import { ExperienceSection } from '@/components/ui/ExperienceSection';
import { ContactSection } from '@/components/ui/ContactSection';
import { Footer } from '@/components/ui/Footer';

export default function Home() {
  // Initialize mouse position tracking & scroll listener
  useMousePosition();
  useScrollProgress();
  useResponsiveCanvas();

  return (
    <main className="relative min-h-screen bg-[#05070E] text-gray-100 overflow-x-hidden">
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* 3D Background Canvas Layer */}
      <CanvasContainer />

      {/* Glassmorphic Navigation */}
      <Navbar />

      {/* Content Sections Overlay */}
      <div className="relative z-10 flex flex-col gap-12">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
        <Footer />
      </div>

      {/* Project Details Modal Dialog */}
      <ProjectModal />
    </main>
  );
}
