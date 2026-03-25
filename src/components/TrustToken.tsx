'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

export default function TrustToken() {
  const meshRef = useRef<THREE.Mesh>(null);
  const orb1 = useRef<THREE.Mesh>(null);
  const orb2 = useRef<THREE.Mesh>(null);
  const orb3 = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.3;
      meshRef.current.rotation.y = t * 0.4;
    }
    
    // Orbital path for inner gradient orbs
    if (orb1.current) {
      orb1.current.position.set(Math.sin(t) * 0.8, Math.cos(t * 0.8) * 0.8, Math.sin(t * 0.5) * 0.8);
    }
    if (orb2.current) {
      orb2.current.position.set(Math.cos(t * 0.9) * 0.8, Math.sin(t * 1.1) * 0.8, Math.cos(t * 0.6) * 0.8);
    }
    if (orb3.current) {
      orb3.current.position.set(Math.sin(t * 0.7) * 0.8, Math.cos(t * 0.9) * 0.8, Math.sin(t * 0.8) * 0.8);
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
        
        {/* Animated inner gradient orbs (Rich Orangish) */}
        <mesh ref={orb1}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshBasicMaterial color="#FF5E00" />
          <pointLight color="#FF5E00" intensity={15} distance={5} />
        </mesh>
        <mesh ref={orb2}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshBasicMaterial color="#FF5E00" />
          <pointLight color="#FF5E00" intensity={15} distance={5} />
        </mesh>
        <mesh ref={orb3}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshBasicMaterial color="#FF5E00" />
          <pointLight color="#FF5E00" intensity={15} distance={5} />
        </mesh>

        {/* Fluent Acrylic / Frosted Glass Material */}
        <mesh ref={meshRef} scale={1.5}>
          <torusKnotGeometry args={[1, 0.35, 128, 32]} />
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

        {/* Floating Data Particles */}
        {particles.map(({ key, position }) => (
          <mesh key={key} position={position}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial 
              color="#FF5E00"
              emissive="#FF5E00"
              emissiveIntensity={isDark ? 1.5 : 2}
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
