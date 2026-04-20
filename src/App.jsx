import { useState, useRef, useCallback, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import MainScene from "./scenes/MainScene";
import Navigation from "./ui/Navigation";
import AboutPanel from "./ui/AboutPanel";
import ContactTerminal from "./ui/ContactTerminal";
import ProjectDetail from "./ui/ProjectDetail";
import AIAssistant from "./ui/AIAssistant";
import VoiceControl from "./ui/VoiceControl";
import { portfolioData } from "./data/portfolioData";
import "./index.css";

// Loading screen component
function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-ring" />
        <div className="loading-text">
          <span className="loading-name">AAKASH NEUPANE</span>
          <span className="loading-sub">Initializing Digital Identity...</span>
        </div>
      </div>
    </div>
  );
}

// Hero overlay on home
function HeroOverlay({ visible }) {
  if (!visible) return null;
  return (
    <div className="hero-overlay">
      <div className="hero-tag">DIGITAL IDENTITY</div>
      <h1 className="hero-name">{portfolioData.name}</h1>
      <p className="hero-title">{portfolioData.title}</p>
      <p className="hero-tagline">{portfolioData.tagline}</p>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const sceneRef = useRef();

  const handleNavigate = useCallback((section) => {
    setActiveSection(section);
    setSelectedProject(null);
    sceneRef.current?.navigateTo(section);
  }, []);

  const handleSelectProject = useCallback((project) => {
    setSelectedProject(project);
  }, []);

  const handleVoiceCommand = useCallback(
    (section) => {
      handleNavigate(section);
    },
    [handleNavigate]
  );

  return (
    <div className="app-container" id="app-root">
      {/* 3D Canvas */}
      <Suspense fallback={<LoadingScreen />}>
        <Canvas
          className="main-canvas"
          dpr={[1, 1.5]}
          camera={{ position: [0, 0.5, 5], fov: 50, near: 0.1, far: 100 }}
          gl={{ antialias: true, alpha: false }}
        >
          <color attach="background" args={["#050816"]} />
          <MainScene
            ref={sceneRef}
            activeSection={activeSection}
            onSelectProject={handleSelectProject}
          />
        </Canvas>
      </Suspense>

      {/* UI Overlays */}
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} />
      <HeroOverlay visible={activeSection === "home"} />

      {activeSection === "about" && (
        <AboutPanel onClose={() => handleNavigate("home")} />
      )}

      {activeSection === "contact" && (
        <ContactTerminal onClose={() => handleNavigate("home")} />
      )}

      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* AI Assistant */}
      <AIAssistant />

      {/* Voice Control */}
      <VoiceControl onCommand={handleVoiceCommand} />
    </div>
  );
}
