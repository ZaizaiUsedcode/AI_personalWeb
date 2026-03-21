'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function Shape({ position, scale, color }: { position: [number, number, number]; scale: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  // 随机旋转速度
  const rotationSpeed = useMemo(() => ({
    x: (Math.random() - 0.5) * 0.3,
    y: (Math.random() - 0.5) * 0.3,
  }), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    // 缓慢旋转
    meshRef.current.rotation.x += rotationSpeed.x * 0.01;
    meshRef.current.rotation.y += rotationSpeed.y * 0.01;

    // 轻微的鼠标视差效果
    const { mouse } = state;
    meshRef.current.position.x = position[0] + mouse.x * 0.3;
    meshRef.current.position.y = position[1] + mouse.y * 0.3;
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.3}
      floatIntensity={0.5}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.15}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingShapes() {
  // 定义3个漂浮的几何形状
  const shapes = useMemo(() => [
    { position: [-3, 2, -2], scale: 1.2, color: '#f97316' },
    { position: [3, -1, -3], scale: 1.5, color: '#fb923c' },
    { position: [0, 1, -4], scale: 1, color: '#fdba74' },
  ] as const, []);

  return (
    <>
      {/* 环境光 */}
      <ambientLight intensity={0.5} />

      {/* 主光源 */}
      <directionalLight position={[5, 5, 5]} intensity={0.8} />

      {/* 漂浮的形状 */}
      {shapes.map((shape, index) => (
        <Shape key={index} {...shape} />
      ))}
    </>
  );
}
