'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Rotate group based on scroll position
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, scrollProgress * Math.PI * 2, delta * 1.5);
  });

  return (
    <group ref={groupRef}>
      {/* Shape 1: Octahedron (About section backdrop left) */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[-4.5, 2, -2]} scale={0.7}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#10B981"
            wireframe
            transparent
            opacity={0.4}
            emissive="#10B981"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      {/* Shape 2: Torus Knot (Skills background right) */}
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1}>
        <mesh position={[4.2, -1.5, -3]} scale={0.6}>
          <torusKnotGeometry args={[0.8, 0.25, 64, 16]} />
          <meshStandardMaterial
            color="#8B5CF6"
            roughness={0.3}
            metalness={0.7}
            transparent
            opacity={0.6}
            emissive="#4C1D95"
            emissiveIntensity={0.4}
          />
        </mesh>
      </Float>

      {/* Shape 3: Dodecahedron (Projects background bottom left) */}
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh position={[-3.8, -4, -1]} scale={0.8}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#06B6D4"
            wireframe
            transparent
            opacity={0.35}
            emissive="#06B6D4"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      {/* Shape 4: Small Ring (Contact top) */}
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1}>
        <mesh position={[3.5, 3.5, -2]} scale={0.5}>
          <torusGeometry args={[1, 0.15, 16, 32]} />
          <meshStandardMaterial
            color="#F59E0B"
            roughness={0.2}
            metalness={0.9}
            emissive="#78350F"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>
    </group>
  );
}
