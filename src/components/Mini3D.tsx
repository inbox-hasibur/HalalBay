'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

interface Mini3DProps {
  type: 'box' | 'sphere';
}

export default function Mini3D({ type }: Mini3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const light1 = useRef<THREE.PointLight>(null);
  const light2 = useRef<THREE.PointLight>(null);
  const light3 = useRef<THREE.PointLight>(null);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? (theme === 'dark' || resolvedTheme === 'dark') : true;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.5;
      meshRef.current.rotation.y = t * 0.5;
    }
    
    // Orbital path for exterior gradient lights
    if (light1.current) {
      light1.current.position.set(Math.sin(t) * 2.5, Math.cos(t * 0.8) * 2.5, Math.sin(t * 0.5) * 2.5);
    }
    if (light2.current) {
      light2.current.position.set(Math.cos(t * 0.9) * 2.5, Math.sin(t * 1.1) * 2.5, Math.cos(t * 0.6) * 2.5);
    }
    if (light3.current) {
      light3.current.position.set(Math.sin(t * 0.7) * 2.5, Math.cos(t * 0.9) * 2.5, Math.sin(t * 0.8) * 2.5);
    }
  });

  return (
    <>
      <ambientLight intensity={isDark ? 0.35 : 0.5} color={isDark ? "#cbd5e1" : "#e0f2fe"} />
      <directionalLight position={[2, 3, 2]} intensity={isDark ? 0.5 : 0.6} color={isDark ? "#93c5fd" : "#fb923c"} />
      <Float speed={3} rotationIntensity={1} floatIntensity={2}>
        
        {/* Animated exterior sweeping lights (Fluent Abstract Multi-Color) */}
        <pointLight ref={light1} color={isDark ? "#0ea5e9" : "#06b6d4"} intensity={40} distance={8} />
        <pointLight ref={light2} color={isDark ? "#a78bfa" : "#f472b6"} intensity={40} distance={8} />
        <pointLight ref={light3} color={isDark ? "#fb7185" : "#fde68a"} intensity={40} distance={8} />

        <mesh ref={meshRef}>
          {type === 'box' ? (
            <RoundedBox args={[1.5, 1.5, 1.5]} radius={0.2} smoothness={4} />
          ) : (
            <Sphere args={[0.9, 32, 32]} />
          )}
          <meshStandardMaterial 
            color={isDark ? "#dbeafe" : "#1e3a8a"} 
            roughness={isDark ? 0.35 : 0.25}
            metalness={isDark ? 0.7 : 0.9}
            emissive={isDark ? "#38bdf8" : "#fbbf24"}
            emissiveIntensity={isDark ? 0.2 : 0.3}
          />
        </mesh>
      </Float>
    </>
  );
}
