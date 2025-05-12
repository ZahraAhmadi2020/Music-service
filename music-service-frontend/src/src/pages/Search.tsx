// src/pages/Search.tsx
import { useState } from "react";
import { motion } from "framer-motion";
 import Background3D from "../components/Background3D";
import { mockTracks } from "../data/mockTracks";
import { Track } from "../types";
import TrackCard from "../components/TrackCard";

interface SearchProps {
  onSelectTrack: (track: Track) => void;
}

function Search({ onSelectTrack }: SearchProps) {
  const [query, setQuery] = useState("");
  const filteredTracks = mockTracks.filter(
    (track) =>
      track.title.toLowerCase().includes(query.toLowerCase()) ||
      track.artist.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative min-h-screen">
      <Background3D />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative p-6 pt-20 z-10"
      >
        <h1 className="text-3xl font-bold mb-6 text-neonGreen">Search Tracks</h1>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for tracks or artists..."
          className="w-full p-3 bg-midGray text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-neonGreen"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {filteredTracks.map((track) => (
            <TrackCard key={track.id} track={track} onSelect={onSelectTrack} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Search;