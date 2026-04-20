import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import Avatar from "../components/Avatar";
import SkillsRing from "../components/SkillsRing";
import ProjectCards from "../components/ProjectCards";
import ParticleField from "../components/ParticleField";
import SceneLighting from "../components/SceneLighting";

const cameraPositions = {
  home: { pos: [0, 0.5, 5], target: [0, 0.5, 0] },
  about: { pos: [-2.5, 0.8, 3.5], target: [0, 0.6, 0] },
  skills: { pos: [0, 2.2, 4.5], target: [0, 0.8, 0] },
  projects: { pos: [1.5, 1, 4.5], target: [0, 0.5, 0] },
  contact: { pos: [0, 0.2, 3.5], target: [0, 0, 0] },
};

const MainScene = forwardRef(function MainScene(
  { activeSection, onSelectProject },
  ref
) {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0.5, 0));
  const isAnimating = useRef(false);

  useImperativeHandle(ref, () => ({
    navigateTo: (section) => {
      const target = cameraPositions[section];
      if (!target || isAnimating.current) return;

      isAnimating.current = true;

      gsap.to(camera.position, {
        x: target.pos[0],
        y: target.pos[1],
        z: target.pos[2],
        duration: 2,
        ease: "power3.inOut",
        onComplete: () => {
          isAnimating.current = false;
        },
      });

      gsap.to(currentLookAt.current, {
        x: target.target[0],
        y: target.target[1],
        z: target.target[2],
        duration: 2,
        ease: "power3.inOut",
      });
    },
  }), [camera]);

  useFrame(() => {
    camera.lookAt(currentLookAt.current);
  });

  useEffect(() => {
    camera.position.set(0, 0.5, 5);
    currentLookAt.current.set(0, 0.5, 0);
    camera.lookAt(0, 0.5, 0);
  }, [camera]);

  return (
    <>
      <SceneLighting />
      <ParticleField />

      {/* Central avatar */}
      <Avatar />

      {/* Skills ring */}
      <SkillsRing visible={activeSection === "skills" || activeSection === "home"} />

      {/* Project cards */}
      <ProjectCards
        visible={activeSection === "projects" || activeSection === "home"}
        onSelectProject={onSelectProject}
      />

      {/* Ground grid */}
      <gridHelper args={[20, 40, "#0a2a4a", "#061428"]} position={[0, -0.5, 0]} />
    </>
  );
});

export default MainScene;
