 
import { motion } from "framer-motion";
import { useState } from "react";
import { FaSearch, FaSignInAlt, FaSignOutAlt, FaUserPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { mockTracks } from "../data/mockTracks";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock search (supports English and Russian)
    const results = mockTracks.filter(
      (track) =>
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log("Search results:", results); // Replace with actual search logic
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-deepBlack to-midPurple p-4 z-30 fog-effect">
      <div className="flex items-center justify-between">
        {/* Logo (Animated) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-deepPurple text-2xl font-bold"
        >
          Главная
        </motion.div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 mx-4 max-w-md">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск песен (Search songs)..."
              className="w-full p-2 bg-darkGray text-lavender rounded-lg focus:outline-none focus:ring-2 focus:ring-deepPurple fog-effect"
            />
            <button type="submit" className="absolute right-2 top-2 text-deepPurple">
              <FaSearch />
            </button>
          </div>
        </form>

        {/* Auth Buttons */}
        <div className="flex space-x-4">
          {isLoggedIn ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-deepPurple text-lavender rounded-lg flex items-center space-x-2 hover:bg-purple-700 fog-effect"
              onClick={() => setIsLoggedIn(false)}
            >
              <FaSignOutAlt />
              <span>Выйти</span>
            </motion.button>
          ) : (
            <>
              <NavLink to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-deepPurple text-lavender rounded-lg flex items-center space-x-2 hover:bg-purple-700 fog-effect"
                >
                  <FaSignInAlt />
                  <span>Войти</span>
                </motion.button>
              </NavLink>
              <NavLink to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-darkGray text-deepPurple rounded-lg flex items-center space-x-2 hover:bg-deepPurple hover:text-lavender fog-effect"
                >
                  <FaUserPlus />
                  <span>Регистрация</span>
                </motion.button>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
 