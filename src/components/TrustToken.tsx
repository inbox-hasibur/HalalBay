'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export default function TrustToken() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Subtle rotation based on time
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2} floatingRange={[-0.1, 0.1]}>
      <group ref={groupRef}>
        {/* Core Token */}
        <RoundedBox args={[2.5, 3.5, 0.4]} radius={0.2} smoothness={4}>
          <MeshDistortMaterial
            color="#0a6e4e"
            envMapIntensity={2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.8}
            roughness={0.2}
            distort={0.2}
            speed={2}
          />
        </RoundedBox>

        {/* Inner Gold Shield/Accent */}
        <RoundedBox args={[1.8, 2.8, 0.45]} radius={0.15} smoothness={4} position={[0, 0, 0.05]}>
          <meshStandardMaterial 
            color="#c9a84c"
            metalness={1}
            roughness={0.1}
            emissive="#c9a84c"
            emissiveIntensity={0.2}
          />
        </RoundedBox>

        {/* Floating elements around the token */}
        {[...Array(5)].map((_, i) => (
          <mesh key={i} position={[
            Math.sin((i / 5) * Math.PI * 2) * 2,
            Math.cos((i / 5) * Math.PI * 2) * 2.5,
            (Math.random() - 0.5) * 2
          ]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="#c9a84c" emissive="#c9a84c" emissiveIntensity={0.5} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}
