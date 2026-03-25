'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

export default function TrustToken() {
  const meshRef = useRef<THREE.Mesh>(null);
  const light1 = useRef<THREE.PointLight>(null);
  const light2 = useRef<THREE.PointLight>(null);
  const light3 = useRef<THREE.PointLight>(null);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use resolvedTheme for accurate hydration matching
  const isDark = mounted ? (theme === 'dark' || resolvedTheme === 'dark') : true;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.3;
      meshRef.current.rotation.y = t * 0.4;
    }
    
    // Orbital path for exterior gradient lights
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
          (Math.random() - 0.5) * 3
        ] as [number, number, number]
      };
    });
  }, []);

  return (
    <>
      <Environment preset={isDark ? "city" : "studio"} />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5} floatingRange={[-0.2, 0.2]}>
        
        {/* Animated exterior sweeping lights (Fluent Abstract Multi-Color) */}
        <pointLight ref={light1} color="#00e5ff" intensity={60} distance={10} />
        <pointLight ref={light2} color="#b026ff" intensity={60} distance={10} />
        <pointLight ref={light3} color="#ff3366" intensity={60} distance={10} />

        {/* Matte Opaque Material */}
        <mesh ref={meshRef} scale={1.5}>
          <torusKnotGeometry args={[1, 0.35, 128, 32]} />
          <meshStandardMaterial 
            color={isDark ? "#e5e5e5" : "#111111"} 
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>

        {/* Floating Data Particles */}
        {particles.map(({ key, position }) => (
          <mesh key={key} position={position}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial 
              color={isDark ? "#00e5ff" : "#000000"}
              emissive={isDark ? "#b026ff" : "#ff3366"}
              emissiveIntensity={isDark ? 2 : 1}
            />
          </mesh>
        ))}
      </Float>
      
      {/* Soft shadow for Fluent depth */}
      {!isDark && (
        <ContactShadows 
          position={[0, -3.5, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2.5} 
          far={4} 
          color="#000000"
        />
      )}
    </>
  );
}
