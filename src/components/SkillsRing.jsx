import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { portfolioData } from "../data/portfolioData";

// Helper function to create canvas texture with text
function createTextTexture(text, fontSize = 24, color = "#00d4ff") {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;
  const context = canvas.getContext("2d");

  context.fillStyle = "#00000000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = color;
  context.font = `bold ${fontSize}px Arial`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

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

      {/* Skill icon background */}
      <mesh position={[0, 0.02, 0.08]}>
        <planeGeometry args={[0.18, 0.18]} />
        <meshBasicMaterial
          map={createTextTexture(skill.icon, 32)}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Skill name label */}
      <mesh position={[0, -0.25, 0.08]}>
        <planeGeometry args={[0.5, 0.1]} />
        <meshBasicMaterial
          map={createTextTexture(skill.name, 16, "#00d4ff")}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Skill level text */}
      <mesh position={[0, -0.35, 0.08]}>
        <planeGeometry args={[0.25, 0.08]} />
        <meshBasicMaterial
          map={createTextTexture(`${skill.level}%`, 14, "#7b61ff")}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Skill label box */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[0.3, 0.02, 0.005]} />
        <meshBasicMaterial color="#1a1a3e" transparent opacity={0.5} />
      </mesh>

      {/* Skill level bar */}
      <mesh position={[-(0.3 - skill.level * 0.003) / 2, -0.3, 0.003]}>
        <boxGeometry args={[Math.max(skill.level * 0.003, 0.01), 0.02, 0.005]} />
        <meshBasicMaterial color={hovered ? "#7b61ff" : "#00d4ff"} />
      </mesh>
    </group>
  );
}
