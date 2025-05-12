// src/components/Navbar.tsx
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-midGray p-4 fixed w-full top-0 z-20"
    >
      <ul className="flex space-x-6 justify-center">
        {["Home", "Search", "Profile", "Admin", "Login", "SignUp"].map((item) => (
          <li key={item}>
            <NavLink
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={({ isActive }) =>
                isActive
                  ? "text-neonGreen font-bold"
                  : "text-white hover:text-neonGreen"
              }
            >
              {item}
            </NavLink>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}

export default Navbar;