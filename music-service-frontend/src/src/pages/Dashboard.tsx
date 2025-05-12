 
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <div className="relative min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Main content */}
      <div className="flex-1">
         <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative p-6 pt-20 md:ml-16 md:group-hover:ml-64 z-10 fog-effect transition-all duration-300"
        >
          <h1 className="text-4xl font-bold mb-8 text-deepPurple">Добро пожаловать!</h1>
          <p className="text-lavender">Это главная страница (Dashboard).</p>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
 