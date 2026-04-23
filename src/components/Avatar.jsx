import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Avatar() {
  const groupRef = useRef();

  const cyanMat = useMemo(() => new THREE.MeshBasicMaterial({ color: "#00ffff" }), []);
  const blueMat = useMemo(() => new THREE.MeshBasicMaterial({ color: "#00d4ff" }), []);
  const darkBlueMat = useMemo(() => new THREE.MeshBasicMaterial({ color: "#0088ff" }), []);
  const wireframeMat = useMemo(() => new THREE.MeshBasicMaterial({ color: "#00ffff", wireframe: true }), []);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      groupRef.current.rotation.y = t * 0.3;
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      {/* Head */}
      <mesh position={[0, 0.9, 0]} material={cyanMat}>
        <sphereGeometry args={[0.3, 32, 32]} />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.3, 0]} material={blueMat}>
        <boxGeometry args={[0.3, 0.6, 0.2]} />
      </mesh>

      {/* Left Arm */}
      <mesh position={[-0.3, 0.5, 0]} material={darkBlueMat}>
        <boxGeometry args={[0.12, 0.5, 0.12]} />
      </mesh>

      {/* Right Arm */}
      <mesh position={[0.3, 0.5, 0]} material={darkBlueMat}>
        <boxGeometry args={[0.12, 0.5, 0.12]} />
      </mesh>

      {/* Left Leg */}
      <mesh position={[-0.1, -0.2, 0]} material={cyanMat}>
        <boxGeometry args={[0.12, 0.5, 0.12]} />
      </mesh>

      {/* Right Leg */}
      <mesh position={[0.1, -0.2, 0]} material={cyanMat}>
        <boxGeometry args={[0.12, 0.5, 0.12]} />
      </mesh>

      {/* Wireframe overlay */}
      <mesh position={[0, 0.5, 0]} material={wireframeMat}>
        <sphereGeometry args={[0.35, 16, 16]} />
      </mesh>
    </group>
  );
}
