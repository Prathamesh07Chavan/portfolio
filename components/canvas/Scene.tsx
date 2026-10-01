'use client';

import { Suspense } from 'react';
import { HeroMesh } from './HeroMesh';
import { BackgroundParticles } from './BackgroundParticles';
import { FloatingShapes } from './FloatingShapes';
import { CameraRig } from './CameraRig';

export function Scene() {
  return (
    <Suspense fallback={null}>
      {/* Lighting Setup */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" castShadow />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#06B6D4" />
      <pointLight position={[0, 0, 5]} intensity={1} color="#8B5CF6" />

      {/* Camera Controller */}
      <CameraRig />

      {/* 3D Scene Geometries */}
      <HeroMesh />
      <FloatingShapes />
      <BackgroundParticles />
    </Suspense>
  );
}
