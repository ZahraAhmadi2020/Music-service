// src/pages/Login.tsx
import { motion } from "framer-motion";
import Background3D from "../components/Background3D";

function Login() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Background3D />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-midGray p-8 rounded-xl shadow-lg z-10 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-neonGreen">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 bg-darkGray rounded-lg focus:outline-none focus:ring-2 focus:ring-neonGreen"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 bg-darkGray rounded-lg focus:outline-none focus:ring-2 focus:ring-neonGreen"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-neonGreen text-black rounded-lg hover:bg-green-400"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;