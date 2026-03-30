'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import FloatingShapes from './FloatingShapes';

export default function ThreeSceneCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 1.5]}
      frameloop="always"
    >
      <Suspense fallback={null}>
        <FloatingShapes />
      </Suspense>
    </Canvas>
  );
}
