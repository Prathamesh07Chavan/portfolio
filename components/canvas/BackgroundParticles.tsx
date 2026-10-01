'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function BackgroundParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const isMobile = usePortfolioStore((state) => state.isMobile);
  const mousePos = usePortfolioStore((state) => state.mousePos);

  const count = isMobile ? 400 : 1000;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#06B6D4'), // Cyan
      new THREE.Color('#10B981'), // Emerald
      new THREE.Color('#8B5CF6'), // Violet
      new THREE.Color('#3B82F6'), // Blue
    ];

    for (let i = 0; i < count; i++) {
      // Spread in 3D box range
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const randomColor = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = randomColor.r;
      col[i * 3 + 1] = randomColor.g;
      col[i * 3 + 2] = randomColor.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Slow ambient rotation
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.015;

    // Gentle reaction to pointer
    pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, mousePos.x * 0.5, delta);
    pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, mousePos.y * 0.5, delta);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
