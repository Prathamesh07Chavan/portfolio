import { create } from 'zustand';
import { Project } from '@/lib/data';

interface PortfolioState {
  activeSection: string;
  setActiveSection: (section: string) => void;
  
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
  
  mousePos: { x: number; y: number };
  setMousePos: (x: number, y: number) => void;
  
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
  
  reducedMotion: boolean;
  setReducedMotion: (val: boolean) => void;
  
  audioEnabled: boolean;
  toggleAudio: () => void;
  
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  
  cursorState: { hovered: boolean; text: string };
  setCursorState: (hovered: boolean, text?: string) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),
  
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  
  mousePos: { x: 0, y: 0 },
  setMousePos: (x, y) => set({ mousePos: { x, y } }),
  
  isMobile: false,
  setIsMobile: (isMobile) => set({ isMobile }),
  
  reducedMotion: false,
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  
  audioEnabled: false,
  toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),
  
  selectedProject: null,
  setSelectedProject: (project) => set({ selectedProject: project }),
  
  cursorState: { hovered: false, text: '' },
  setCursorState: (hovered, text = '') => set({ cursorState: { hovered, text } }),
}));
