import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei/core/RoundedBox";
import { portfolioData } from "../data/portfolioData";

export default function ProjectCards({ visible, onSelectProject }) {
  const groupRef = useRef();
  const { projects } = portfolioData;

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  if (!visible) return null;

  return (
    <group ref={groupRef}>
      {projects.map((project, index) => {
        const angle = (index / projects.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 2.5;
        const position = [Math.cos(angle) * radius, 0.5, Math.sin(angle) * radius];

        return (
          <ProjectCard
            key={project.id}
            project={project}
            position={position}
            rotation={[0, -angle + Math.PI, 0]}
            index={index}
            onSelect={() => onSelectProject(project)}
          />
        );
      })}
    </group>
  );
}

function ProjectCard({ project, position, rotation, index, onSelect }) {
  const ref = useRef();
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
        position[1] + Math.sin(elapsed + index * 2) * 0.06,
        position[2]
      );
    }
  });

  return (
    <group
      ref={ref}
      position={position}
      rotation={rotation}
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "default";
      }}
    >
      <RoundedBox args={[1.4, 0.9, 0.02]} radius={0.04} smoothness={2}>
        <meshBasicMaterial
          color="#0a0e27"
          transparent
          opacity={hovered ? 0.85 : 0.7}
        />
      </RoundedBox>

      <mesh>
        <boxGeometry args={[1.44, 0.94, 0.005]} />
        <meshBasicMaterial
          color={project.color}
          transparent
          opacity={hovered ? 0.4 : 0.15}
        />
      </mesh>

      {/* Project color indicator */}
      <mesh position={[0.5, 0.3, 0.02]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshBasicMaterial color={project.color} />
      </mesh>

      {/* Project label bar */}
      <mesh position={[0, 0.12, 0.015]}>
        <boxGeometry args={[0.8, 0.04, 0.005]} />
        <meshBasicMaterial color={project.color} transparent opacity={0.3} />
      </mesh>

      {/* Bottom accent bar */}
      <mesh position={[0, -0.4, 0.015]}>
        <boxGeometry args={[hovered ? 1.3 : 0.6, 0.008, 0.001]} />
        <meshBasicMaterial color={project.color} />
      </mesh>
    </group>
  );
}
