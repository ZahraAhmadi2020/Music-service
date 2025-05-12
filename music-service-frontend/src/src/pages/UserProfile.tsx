// src/pages/UserProfile.tsx
import { motion } from "framer-motion";
import TrackCard from "../components/TrackCard";
import Background3D from "../components/Background3D";
import { mockTracks } from "../data/mockTracks";
import { User } from "../types";

function UserProfile() {
  const user: User = {
    id: 1,
    username: "MusicLover",
    email: "user@example.com",
    favoriteTracks: mockTracks.slice(0, 2),
  };

  return (
    <div className="relative min-h-screen">
      <Background3D />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative p-6 pt-20 z-10"
      >
        <h1 className="text-3xl font-bold mb-6 text-neonGreen">User Profile</h1>
        <div className="bg-midGray p-6 rounded-xl mb-8">
          <h2 className="text-xl font-semibold">{user.username}</h2>
          <p className="text-gray-400">{user.email}</p>
        </div>
        <h3 className="text-2xl font-bold mb-4 text-neonGreen">Favorite Tracks</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {user.favoriteTracks.map((track) => (
            <TrackCard key={track.id} track={track} onSelect={() => {}} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default UserProfile;