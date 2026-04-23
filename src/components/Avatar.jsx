import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Avatar() {
  const groupRef = useRef();

  // Reuse a single wireframe material and a single solid material
  const wireMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#00d4ff"),
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      }),
    []
  );

  const solidMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#00bbff"),
        transparent: true,
        opacity: 0.6,
      }),
    []
  );

  const glowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#00ffff"),
        transparent: true,
        opacity: 0.5,
      }),
    []
  );

  const ringMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#00d4ff"),
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
      }),
    []
  );

  const torusMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#00d4ff"),
        transparent: true,
        opacity: 0.4,
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      const breathe = Math.sin(t * 1.2) * 0.005;
      groupRef.current.scale.set(1 + breathe * 0.2, 1 + breathe, 1 + breathe * 0.2);
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.03;
      groupRef.current.position.y = -0.3 + Math.sin(t * 0.5) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      {/* Head wireframe */}
      <mesh position={[0, 1.55, 0]} material={wireMat}>
        <sphereGeometry args={[0.22, 16, 16]} />
      </mesh>
      {/* Head solid */}
      <mesh position={[0, 1.55, 0]} material={solidMat}>
        <sphereGeometry args={[0.19, 12, 12]} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.28, 0]} material={wireMat}>
        <cylinderGeometry args={[0.06, 0.08, 0.12, 8]} />
      </mesh>

      {/* Torso wireframe */}
      <mesh position={[0, 0.9, 0]} material={wireMat}>
        <capsuleGeometry args={[0.22, 0.5, 8, 16]} />
      </mesh>
      {/* Torso solid */}
      <mesh position={[0, 0.9, 0]} material={solidMat}>
        <capsuleGeometry args={[0.19, 0.45, 6, 12]} />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.35, 0.9, 0]} rotation={[0, 0, 0.15]} material={wireMat}>
        <capsuleGeometry args={[0.06, 0.5, 4, 8]} />
      </mesh>
      <mesh position={[0.35, 0.9, 0]} rotation={[0, 0, -0.15]} material={wireMat}>
        <capsuleGeometry args={[0.06, 0.5, 4, 8]} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.12, 0.2, 0]} material={wireMat}>
        <capsuleGeometry args={[0.08, 0.55, 4, 8]} />
      </mesh>
      <mesh position={[0.12, 0.2, 0]} material={wireMat}>
        <capsuleGeometry args={[0.08, 0.55, 4, 8]} />
      </mesh>

      {/* Core glow */}
      <mesh position={[0, 0.9, 0]} material={glowMat}>
        <sphereGeometry args={[0.1, 12, 12]} />
      </mesh>

      {/* Base ring */}
      <mesh position={[0, -0.15, 0]} rotation={[-Math.PI / 2, 0, 0]} material={ringMat}>
        <ringGeometry args={[0.35, 0.65, 32]} />
      </mesh>

      {/* Base torus */}
      <mesh position={[0, -0.15, 0]} rotation={[-Math.PI / 2, 0, 0]} material={torusMat}>
        <torusGeometry args={[0.65, 0.006, 8, 32]} />
      </mesh>

      {/* Scan line */}
      <ScanLine />
    </group>
  );
}

function ScanLine() {
  const ref = useRef();
  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#00ffff"),
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.position.y = ((t * 0.5) % 2) * 1.2 - 0.2;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} material={mat}>
      <planeGeometry args={[0.8, 0.01]} />
    </mesh>
  );
}
