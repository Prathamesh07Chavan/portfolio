'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function HeroMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const activeSection = usePortfolioStore((state) => state.activeSection);
  const mousePos = usePortfolioStore((state) => state.mousePos);
  const isMobile = usePortfolioStore((state) => state.isMobile);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Smooth target rotation based on mouse position
    const targetRotX = mousePos.y * 0.4;
    const targetRotY = mousePos.x * 0.4;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX + state.clock.elapsedTime * 0.15, delta * 2);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY + state.clock.elapsedTime * 0.2, delta * 2);

    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = meshRef.current.rotation.x * -1.1;
      wireframeRef.current.rotation.y = meshRef.current.rotation.y * 1.1;
    }

    // Dynamic section scale and position offset
    let targetScale = isMobile ? 1.2 : 1.8;
    let targetX = isMobile ? 0 : 1.8;
    let targetY = 0;

    if (activeSection === 'about') {
      targetScale = isMobile ? 0.9 : 1.3;
      targetX = isMobile ? 0 : -2.2;
      targetY = 0.5;
    } else if (activeSection === 'skills') {
      targetScale = isMobile ? 0.8 : 1.2;
      targetX = isMobile ? 0 : 2.2;
      targetY = -0.5;
    } else if (activeSection === 'projects') {
      targetScale = isMobile ? 0.6 : 1.0;
      targetX = isMobile ? 0 : -2.5;
      targetY = -1.0;
    } else if (activeSection === 'experience') {
      targetScale = isMobile ? 0.7 : 1.1;
      targetX = isMobile ? 0 : 2.0;
      targetY = 0.2;
    } else if (activeSection === 'contact') {
      targetScale = isMobile ? 0.9 : 1.4;
      targetX = 0;
      targetY = 1.2;
    }

    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 2);
    meshRef.current.position.lerp(new THREE.Vector3(targetX, targetY, 0), delta * 2);
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group>
        {/* Primary Distorted Geometrical Core */}
        <mesh ref={meshRef} position={[1.8, 0, 0]} castShadow receiveShadow>
          <icosahedronGeometry args={[1, 32]} />
          <MeshDistortMaterial
            color="#06B6D4"
            roughness={0.2}
            metalness={0.8}
            distort={isMobile ? 0.25 : 0.45}
            speed={2.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
            emissive="#032B3A"
            emissiveIntensity={0.6}
          />
        </mesh>

        {/* Outer Tech Wireframe Accent Shell */}
        <mesh ref={wireframeRef} position={[1.8, 0, 0]} scale={[1.15, 1.15, 1.15]}>
          <icosahedronGeometry args={[1, 4]} />
          <meshStandardMaterial
            color="#8B5CF6"
            wireframe
            transparent
            opacity={0.3}
            emissive="#8B5CF6"
            emissiveIntensity={0.4}
          />
        </mesh>
      </group>
    </Float>
  );
}
