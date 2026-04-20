export default function SceneLighting() {
  return (
    <>
      {/* Ambient fill boosted */}
      <ambientLight intensity={0.4} color="#8888ff" />

      {/* Key light main cyan directional */}
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#00d4ff" />

      {/* Fill light violet from opposite side */}
      <directionalLight
        position={[-4, 3, -3]}
        intensity={0.8}
        color="#7b61ff"
      />

      {/* Rim light pink back edge */}
      <pointLight position={[0, 3, -4]} intensity={3} color="#ff6b9d" distance={12} />

      {/* Ground bounce upward cyan */}
      <pointLight position={[0, -1, 2]} intensity={2} color="#00d4ff" distance={8} />

      {/* Front fill */}
      <pointLight position={[0, 1, 5]} intensity={1} color="#ffffff" distance={10} />

      {/* Depth fog */}
      <fog attach="fog" args={["#050816", 10, 30]} />
    </>
  );
}
