import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 400;

function pseudoRandom(seed) {
  const value = Math.sin(seed * 12.9898) * 43758.5453123;
  return value - Math.floor(value);
}

function createParticleCloud() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);

  const colorA = new THREE.Color("#00d4ff");
  const colorB = new THREE.Color("#7b61ff");
  const colorC = new THREE.Color("#ff6b9d");

  for (let index = 0; index < PARTICLE_COUNT; index += 1) {
    const theta = pseudoRandom(index + 1) * Math.PI * 2;
    const phi = Math.acos(2 * pseudoRandom(index + 101) - 1);
    const radius = 3 + pseudoRandom(index + 1001) * 8;

    positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[index * 3 + 2] = radius * Math.cos(phi);

    const colorChoice = pseudoRandom(index + 5001);
    const color =
      colorChoice < 0.5 ? colorA : colorChoice < 0.8 ? colorB : colorC;

    colors[index * 3] = color.r;
    colors[index * 3 + 1] = color.g;
    colors[index * 3 + 2] = color.b;
  }

  return { positions, colors };
}

export default function ParticleField() {
  const meshRef = useRef();
  const { positions, colors } = useMemo(() => createParticleCloud(), []);

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;

    if (meshRef.current) {
      meshRef.current.rotation.y = elapsed * 0.02;
      meshRef.current.rotation.x = Math.sin(elapsed * 0.05) * 0.05;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
