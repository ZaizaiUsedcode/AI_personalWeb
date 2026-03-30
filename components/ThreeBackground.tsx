'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import FloatingShapes from './FloatingShapes';

export default function ThreeBackground() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (typeof window === 'undefined') return null;

  if (isMobile) return null;

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{
          antialias: false, // 禁用抗锯齿以提升性能
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]} // 限制设备像素比以提升性能
        frameloop="always" // 持续渲染以实现流畅动画
      >
        <Suspense fallback={null}>
          <FloatingShapes />
        </Suspense>
      </Canvas>
    </div>
  );
}
