'use client';

import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function CameraRig() {
  const mousePos = usePortfolioStore((state) => state.mousePos);
  const activeSection = usePortfolioStore((state) => state.activeSection);
  const isMobile = usePortfolioStore((state) => state.isMobile);

  useFrame((state, delta) => {
    // Camera base position based on screen & section
    let targetZ = isMobile ? 7 : 5.5;
    let targetX = 0;
    let targetY = 0;

    if (activeSection === 'about') {
      targetX = 0.5;
      targetZ = isMobile ? 6.5 : 5.0;
    } else if (activeSection === 'skills') {
      targetX = -0.5;
    } else if (activeSection === 'projects') {
      targetY = -0.3;
    } else if (activeSection === 'contact') {
      targetY = 0.2;
    }

    // Add pointer parallax offset
    const parallaxX = mousePos.x * 0.4;
    const parallaxY = mousePos.y * 0.4;

    const finalX = targetX + parallaxX;
    const finalY = targetY + parallaxY;

    state.camera.position.lerp(new THREE.Vector3(finalX, finalY, targetZ), delta * 2.5);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}
