 
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Headset() {
  const headsetRef = useRef<THREE.Group>(null);
  const colorRef = useRef(new THREE.Color("#4B0082")); // Initial color: purple

  // Rotate headset and interpolate color
  useFrame(({ clock }) => {
    if (headsetRef.current) {
      headsetRef.current.rotation.y += 0.005; // Slow rotation on Y-axis
      headsetRef.current.rotation.z += 0.002; // Slight tilt on Z-axis
    }

    // Color interpolation
    const t = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5; // Smooth oscillation
    const color1 = new THREE.Color("#4B0082"); // Purple
    const color2 = new THREE.Color("#E6E6FA"); // Lavender
    const color3 = new THREE.Color("#00FF7F"); // Green
    let targetColor;
    if (t < 0.33) {
      targetColor = color1.lerp(color2, t / 0.33);
    } else if (t < 0.66) {
      targetColor = color2.lerp(color3, (t - 0.33) / 0.33);
    } else {
      targetColor = color3.lerp(color1, (t - 0.66) / 0.34);
    }
    colorRef.current.lerp(targetColor, 0.05); // Smooth transition
  });

  return (
    <group ref={headsetRef} position={[0, 0, -5]}>
      {/* Headband (cylinder) */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[1, 1, 0.2, 32]} />
        <meshStandardMaterial
          color={colorRef.current}
          emissive={colorRef.current}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {/* Left earpad */}
      <mesh position={[-1, 0, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color={colorRef.current}
          emissive={colorRef.current}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {/* Right earpad */}
      <mesh position={[1, 0, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color={colorRef.current}
          emissive={colorRef.current}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      {/* Ambient light for visibility */}
      <ambientLight intensity={0.3} />
      {/* Point light for glow effect */}
      <pointLight
        position={[0, 0, -3]}
        intensity={1}
        color="#4B0082"
        distance={10}
        decay={2}
      />
      {/* Headset model */}
      <Headset />
      {/* Optional: OrbitControls for debugging (disable in production) */}
      {/* <OrbitControls enableZoom={false} /> */}
    </>
  );
}

function Background3D() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        background: "linear-gradient(to bottom right, #0A0A0F, #1C2526)",
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <Scene />
      </Canvas>
    </div>
  );
}

export default Background3D;
 