'use client';

import { Canvas } from "@react-three/fiber";
import TrustToken from "@/components/TrustToken";

export default function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      <TrustToken />
    </Canvas>
  );
}
