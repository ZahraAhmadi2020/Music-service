 
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { Mesh } from "three";
import { motion } from "framer-motion";
import { Track } from "../types";

interface PlayerProps {
  currentTrack: Track | null;
}

function Player({ currentTrack }: PlayerProps) {
  const sphereRef = useRef<Mesh>(null);

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-mistGray p-4 shadow-lg z-10 fog-effect"
    >
      {currentTrack ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-20 h-20">
              <Canvas>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <mesh ref={sphereRef}>
                  <sphereGeometry args={[1, 32, 32]} />
                  <meshStandardMaterial color="#D8BFD8" />
                </mesh>
                <OrbitControls enableZoom={false} />
              </Canvas>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-offWhite">{currentTrack.title}</h3>
              <p className="text-gray-400">{currentTrack.artist}</p>
              <p className="text-gray-500 text-sm">
                {Math.floor(currentTrack.durationSeconds / 60)}:
                {(currentTrack.durationSeconds % 60).toString().padStart(2, "0")}
              </p>
            </div>
          </div>
          <button
            className="px-4 py-2 bg-lightPurple text-darkBlue rounded-lg opacity-50 cursor-not-allowed fog-effect"
            disabled
          >
            Играть (Нет аудио)
          </button>
        </div>
      ) : (
        <p className="text-center text-offWhite">Трек не выбран</p>
      )}
    </motion.div>
  );
}

export default Player;
 