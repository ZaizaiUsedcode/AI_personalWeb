'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import FloatingShapes from './FloatingShapes';

export default function ThreeBackground() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // 检测移动设备
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 服务端渲染时不渲染 Three.js
  if (!isMounted) return null;

  // 移动端不渲染 Three.js 以优化性能
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
