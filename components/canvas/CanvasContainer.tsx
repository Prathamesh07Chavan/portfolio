'use client';

import dynamic from 'next/dynamic';
import { usePortfolioStore } from '@/store/usePortfolioStore';

// Dynamic client import with ssr: false
const DynamicCanvas = dynamic(
  () => import('@react-three/fiber').then((mod) => {
    const Canvas = mod.Canvas;
    // Import Scene inside dynamic scope
    return function DynamicCanvasWrapper(props: any) {
      const Scene = require('./Scene').Scene;
      return (
        <Canvas {...props}>
          <Scene />
        </Canvas>
      );
    };
  }),
  {
    ssr: false,
    loading: () => <CanvasLoader />,
  }
);

function CanvasLoader() {
  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#05070E]/80 backdrop-blur-md pointer-events-none">
      <div className="relative flex items-center justify-center">
        {/* Animated Cyber Ring Spinner */}
        <div className="w-20 h-20 rounded-full border-2 border-accentCyan/20 border-t-accentCyan animate-spin" />
        <div className="absolute w-12 h-12 rounded-full border-2 border-accentViolet/30 border-b-accentViolet animate-spin-slow" />
        <div className="absolute w-4 h-4 rounded-full bg-accentEmerald animate-pulse" />
      </div>
      <div className="mt-6 flex flex-col items-center gap-1">
        <span className="font-heading text-sm tracking-widest text-gray-300 uppercase animate-pulse">
          Initializing 3D Environment
        </span>
        <span className="text-xs text-gray-500 font-mono">Procedural Shader Engine • Prathamesh Chavan</span>
      </div>
    </div>
  );
}

export function CanvasContainer() {
  const isMobile = usePortfolioStore((state) => state.isMobile);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <DynamicCanvas
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: false,
        }}
        camera={{ position: [0, 0, 5], fov: 60 }}
        shadows={false}
      />
    </div>
  );
}
