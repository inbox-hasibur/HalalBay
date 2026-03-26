'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

export default function TrustToken() {
  const meshRef = useRef<THREE.Mesh>(null);
  const light1 = useRef<THREE.PointLight>(null);
  const light2 = useRef<THREE.PointLight>(null);
  const light3 = useRef<THREE.PointLight>(null);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { viewport } = useThree();

  useEffect(() => { setMounted(true); }, []);

  const isDark = mounted ? (theme === 'dark' || resolvedTheme === 'dark') : true;

  // Mobile: smaller scale; Desktop: full scale
  const isMobile = viewport.width < 6; // R3F viewport units (not px)
  const scale = isMobile ? 0.65 : 1.4;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.3;
      meshRef.current.rotation.y = t * 0.4;
    }
    if (light1.current) {
      light1.current.position.set(Math.sin(t) * 3, Math.cos(t * 0.8) * 3, Math.sin(t * 0.5) * 3);
    }
    if (light2.current) {
      light2.current.position.set(Math.cos(t * 0.9) * 3, Math.sin(t * 1.1) * 3, Math.cos(t * 0.6) * 3);
    }
    if (light3.current) {
      light3.current.position.set(Math.sin(t * 0.7) * 3, Math.cos(t * 0.9) * 3, Math.sin(t * 0.8) * 3);
    }
  });

  const particles = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 2.5 + Math.random() * 0.5;
      return {
        key: i,
        position: [
          Math.sin(angle) * radius,
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 3,
        ] as [number, number, number],
      };
    });
  }, []);

  return (
    <>
      <ambientLight intensity={isDark ? 0.4 : 0.3} color={isDark ? '#ffffff' : '#fff8f0'} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={isDark ? 0.6 : 0.9}
        color={isDark ? '#a8c4ff' : '#ffb347'}
      />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5} floatingRange={[-0.2, 0.2]}>

        {/* Orbital sweeping lights */}
        {/* Dark: cyan/magenta/red  |  Light: warm orange/amber/gold */}
        <pointLight ref={light1} color={isDark ? '#00e5ff' : '#f97316'} intensity={60} distance={10} />
        <pointLight ref={light2} color={isDark ? '#b026ff' : '#f59e0b'} intensity={60} distance={10} />
        <pointLight ref={light3} color={isDark ? '#ff3366' : '#d97706'} intensity={60} distance={10} />

        {/* Main mesh */}
        <mesh ref={meshRef} scale={scale}>
          <torusKnotGeometry args={[1, 0.35, 128, 32]} />
          <meshStandardMaterial
            /* Dark: near-white silver  |  Light: warm orange */
            color={isDark ? '#f5f6f7' : '#f97316'}
            roughness={0.4}
            metalness={0.75}
            emissive={isDark ? '#2a82ff' : '#ea580c'}
            emissiveIntensity={isDark ? 0.1 : 0.18}
          />
        </mesh>

        {/* Floating data particles */}
        {particles.map(({ key, position }) => (
          <mesh key={key} position={position}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color={isDark ? '#60a5fa' : '#fbbf24'}
              emissive={isDark ? '#34d399' : '#f97316'}
              emissiveIntensity={isDark ? 2 : 2.2}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        ))}
      </Float>

      {/* Soft contact shadow for depth in light mode */}
      {!isDark && (
        <ContactShadows
          position={[0, -3.5, 0]}
          opacity={0.25}
          scale={10}
          blur={2.5}
          far={4}
          color="#7c3000"
        />
      )}
    </>
  );
}
