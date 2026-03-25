'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

interface Mini3DProps {
  type: 'box' | 'sphere';
}

export default function Mini3D({ type }: Mini3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const orb1 = useRef<THREE.Mesh>(null);
  const orb2 = useRef<THREE.Mesh>(null);
  const orb3 = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.5;
      meshRef.current.rotation.y = t * 0.5;
    }
    
    // Orbital path for inner gradient orbs
    if (orb1.current) {
      orb1.current.position.set(Math.sin(t) * 0.6, Math.cos(t * 0.8) * 0.6, Math.sin(t * 0.5) * 0.6);
    }
    if (orb2.current) {
      orb2.current.position.set(Math.cos(t * 0.9) * 0.6, Math.sin(t * 1.1) * 0.6, Math.cos(t * 0.6) * 0.6);
    }
    if (orb3.current) {
      orb3.current.position.set(Math.sin(t * 0.7) * 0.6, Math.cos(t * 0.9) * 0.6, Math.sin(t * 0.8) * 0.6);
    }
  });

  return (
    <>
      <Float speed={3} rotationIntensity={1} floatIntensity={2}>
        
        {/* Animated inner gradient orbs (Rich Orangish) */}
        <mesh ref={orb1}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshBasicMaterial color="#FF5E00" />
          <pointLight color="#FF5E00" intensity={10} distance={4} />
        </mesh>
        <mesh ref={orb2}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshBasicMaterial color="#FF5E00" />
          <pointLight color="#FF5E00" intensity={10} distance={4} />
        </mesh>
        <mesh ref={orb3}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshBasicMaterial color="#FF5E00" />
          <pointLight color="#FF5E00" intensity={10} distance={4} />
        </mesh>

        <mesh ref={meshRef}>
          {type === 'box' ? (
            <RoundedBox args={[1.5, 1.5, 1.5]} radius={0.2} smoothness={4} />
          ) : (
            <Sphere args={[0.9, 32, 32]} />
          )}
          <meshPhysicalMaterial 
            color={isDark ? "#ffffff" : "#0f172a"}
            transmission={isDark ? 0.9 : 0.4} 
            opacity={1} 
            metalness={isDark ? 0.1 : 0.6}
            roughness={isDark ? 0.3 : 0.4}
            ior={1.5} 
            thickness={2.5} 
            specularIntensity={isDark ? 0.2 : 1} 
            specularColor={isDark ? "#ffffff" : "#334155"}
            emissive={isDark ? "#ffffff" : "#000000"}
            emissiveIntensity={isDark ? 0.05 : 0}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
      </Float>
    </>
  );
}
