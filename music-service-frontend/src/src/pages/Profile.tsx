// User profile page
// Displays user information, favorite tracks, and playlists

import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Track } from "../types";

function Profile() {
  // State for user information
  const [user, setUser] = useState({ name: "", email: "" });
  // State for favorite tracks
  const [favoriteTracks, setFavoriteTracks] = useState<Track[]>([]);

  // Fetch profile and favorite tracks on mount
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user/profile")
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching profile:", error));

    axios
      .get("http://localhost:8080/api/user/favorites")
      .then((response) => setFavoriteTracks(response.data))
      .catch((error) => console.error("Error fetching favorites:", error));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 text-white"
    >
      {/* User information */}
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="mb-8">
        <p className="text-lg">Name: {user.name}</p>
        <p className="text-lg">Email: {user.email}</p>
      </div>

      {/* Favorite tracks */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Favorite Tracks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {favoriteTracks.map((track) => (
            <motion.div
              key={track.id}
              whileHover={{ scale: 1.05 }}
              className="p-4 bg-gray-800 rounded-lg shadow-lg"
            >
              <h3 className="text-lg font-bold">{track.title}</h3>
              <p className="text-gray-400">{track.artist}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

export default Profile;