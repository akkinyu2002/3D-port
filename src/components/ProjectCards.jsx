import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei/core/RoundedBox";
import { Text } from "@react-three/drei/core/Text";
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

      <Text
        position={[-0.5, 0.28, 0.02]}
        fontSize={0.07}
        color={project.color}
        anchorX="left"
        anchorY="middle"
      >
        {`PROJECT 0${project.id}`}
      </Text>

      <Text
        position={[-0.5, 0.12, 0.02]}
        fontSize={0.1}
        color="#f0f0f5"
        anchorX="left"
        anchorY="middle"
        maxWidth={1.2}
      >
        {project.title}
      </Text>

      <Text
        position={[-0.5, -0.08, 0.02]}
        fontSize={0.055}
        color="#8888aa"
        anchorX="left"
        anchorY="top"
        maxWidth={1.2}
        lineHeight={1.4}
      >
        {project.description}
      </Text>

      <mesh position={[0, -0.4, 0.015]}>
        <boxGeometry args={[hovered ? 1.3 : 0.6, 0.008, 0.001]} />
        <meshBasicMaterial color={project.color} />
      </mesh>
    </group>
  );
}
