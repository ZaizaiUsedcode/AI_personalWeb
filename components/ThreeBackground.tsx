'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const THREE_CLOCK_DEPRECATION_MESSAGE =
  'Clock: This module has been deprecated. Please use THREE.Timer instead.';

if (typeof window !== 'undefined') {
  const originalWarn = console.warn;

  if (!(originalWarn as typeof console.warn & { __threeClockFiltered?: boolean }).__threeClockFiltered) {
    const filteredWarn: typeof console.warn & { __threeClockFiltered?: boolean } = (...args) => {
      const [firstArg] = args;

      if (typeof firstArg === 'string' && firstArg.includes(THREE_CLOCK_DEPRECATION_MESSAGE)) {
        return;
      }

      originalWarn(...args);
    };

    filteredWarn.__threeClockFiltered = true;
    console.warn = filteredWarn;
  }
}

const ThreeSceneCanvas = dynamic(() => import('./ThreeSceneCanvas'), {
  ssr: false,
  loading: () => null,
});

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
      <ThreeSceneCanvas />
    </div>
  );
}
