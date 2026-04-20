import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei/core/Text";
import { portfolioData } from "../data/portfolioData";

export default function SkillsRing({ visible }) {
  const groupRef = useRef();
  const { skills } = portfolioData;
  const count = skills.length;

  const positions = useMemo(
    () =>
      skills.map((_, index) => {
        const angle = (index / count) * Math.PI * 2;
        const radius = 2.2;

        return [
          Math.cos(angle) * radius,
          0.8 + Math.sin(index * 0.8) * 0.3,
          Math.sin(angle) * radius,
        ];
      }),
    [count, skills]
  );

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  if (!visible) return null;

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.8, 0]}>
        <torusGeometry args={[2.2, 0.005, 8, 64]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.3} />
      </mesh>

      {skills.map((skill, index) => (
        <SkillNode
          key={skill.name}
          skill={skill}
          position={positions[index]}
          index={index}
        />
      ))}
    </group>
  );
}

function SkillNode({ skill, position, index }) {
  const ref = useRef();
  const glowRef = useRef();
  const [hovered, setHovered] = useState(false);

  useEffect(
    () => () => {
      document.body.style.cursor = "default";
    },
    []
  );

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;

    if (ref.current) {
      ref.current.position.set(
        position[0],
        position[1] + Math.sin(elapsed * 1.5 + index) * 0.08,
        position[2]
      );
    }

    if (glowRef.current) {
      glowRef.current.scale.setScalar(
        hovered ? 1.4 : 1 + Math.sin(elapsed * 2 + index) * 0.1
      );
    }
  });

  return (
    <group
      ref={ref}
      position={position}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "default";
      }}
    >
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.15, 12, 12]} />
        <meshBasicMaterial
          color={hovered ? "#7b61ff" : "#00d4ff"}
          transparent
          opacity={hovered ? 0.5 : 0.2}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color={hovered ? "#7b61ff" : "#00d4ff"} />
      </mesh>

      <Text position={[0, 0.22, 0]} fontSize={0.16} anchorX="center" anchorY="middle">
        {skill.icon}
      </Text>

      <Text
        position={[0, -0.18, 0]}
        fontSize={0.07}
        color={hovered ? "#7b61ff" : "#00d4ff"}
        anchorX="center"
        anchorY="top"
      >
        {skill.name}
      </Text>

      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[0.3, 0.02, 0.005]} />
        <meshBasicMaterial color="#1a1a3e" transparent opacity={0.5} />
      </mesh>

      <mesh position={[-(0.3 - skill.level * 0.003) / 2, -0.3, 0.003]}>
        <boxGeometry args={[skill.level * 0.003, 0.02, 0.005]} />
        <meshBasicMaterial color={hovered ? "#7b61ff" : "#00d4ff"} />
      </mesh>
    </group>
  );
}
