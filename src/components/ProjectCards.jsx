import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei/core/RoundedBox";
import * as THREE from "three";
import { portfolioData } from "../data/portfolioData";

// Helper function to create canvas texture with text
function createTextTexture(text, fontSize = 24, color = "#00d4ff", width = 512, height = 256) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");

  context.fillStyle = "#00000000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = color;
  context.font = `bold ${fontSize}px Arial`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  
  // Handle multiline text
  const lines = text.split("\n");
  const lineHeight = fontSize * 1.2;
  const startY = canvas.height / 2 - (lines.length - 1) * lineHeight / 2;
  
  lines.forEach((line, i) => {
    context.fillText(line, canvas.width / 2, startY + i * lineHeight);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

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

      {/* Project title */}
      <mesh position={[0, 0.25, 0.02]}>
        <planeGeometry args={[1.2, 0.18]} />
        <meshBasicMaterial
          map={createTextTexture(project.title, 28, project.color, 512, 200)}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Project description */}
      <mesh position={[0, 0.05, 0.02]}>
        <planeGeometry args={[1.2, 0.15]} />
        <meshBasicMaterial
          map={createTextTexture(
            project.description.length > 50
              ? project.description.substring(0, 50) + "..."
              : project.description,
            14,
            "#00d4ff",
            512,
            180
          )}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Project tags preview */}
      <mesh position={[0, -0.25, 0.02]}>
        <planeGeometry args={[1.2, 0.1]} />
        <meshBasicMaterial
          map={createTextTexture(project.tags.slice(0, 2).join(" • "), 12, "#7b61ff", 512, 150)}
          transparent
          side={THREE.DoubleSide}
        />
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
