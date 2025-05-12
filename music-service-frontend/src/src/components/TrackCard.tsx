 
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { useRef } from "react";
import { Mesh } from "three";
import { Track } from "../types";
import { motion } from "framer-motion";

interface TrackCardProps {
  track: Track;
  onSelect: (track: Track) => void;
}

function TrackCard({ track, onSelect }: TrackCardProps) {
  const meshRef = useRef<Mesh>(null);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative bg-darkPurpleHover rounded-xl p-4 shadow-lg"
    >
      <div className="h-40">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <mesh ref={meshRef} onClick={() => onSelect(track)}>
            <boxGeometry args={[2, 2, 0.2]} />
            <meshStandardMaterial color="#8B00FF" />
            <Text
              position={[0, 0, 0.11]}
              fontSize={0.3}
              color="#E6E6FA"
              anchorX="center"
              anchorY="middle"
            >
              {track.title}
            </Text>
          </mesh>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-lavender">{track.title}</h3>
        <p className="text-gray-400">{track.artist}</p>
        <p className="text-gray-500 text-sm">{track.album || "Нет альбома"}</p>
        <p className="text-gray-500 text-sm">{track.genre || "Нет жанра"}</p>
        <p className="text-gray-500 text-sm">
          {Math.floor(track.durationSeconds / 60)}:
          {(track.durationSeconds % 60).toString().padStart(2, "0")}
        </p>
        <button
          onClick={() => onSelect(track)}
          className="mt-3 px-4 py-2 bg-purple-500 text-darkPurple rounded-lg hover:bg-purple-400"
        >
          Выбрать
        </button>
      </div>
    </motion.div>
  );
}

export default TrackCard;
 