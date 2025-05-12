 
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaNewspaper,
  FaQuestionCircle,
  FaInfoCircle,
  FaUsers,
  FaMusic,
  FaStar,
  FaAward,
  FaUserPlus,
  FaComment,
  FaThumbsUp,
  FaPen,
  FaHeadphones,
  FaBook,
  FaBars,
  FaTimes,
  FaAngleDown,
} from "react-icons/fa";
import "./Sidebar.css";

// Menu items with dropdowns (in Russian)
const menuItems = [
  { name: "Главная", path: "/", icon: <FaHome /> },
  { name: "Новости", path: "/news", icon: <FaNewspaper /> },
  { name: "Часто задаваемые вопросы", path: "/faq", icon: <FaQuestionCircle /> },
  { name: "О нас", path: "/about", icon: <FaInfoCircle /> },
  {
    name: "ТОП-90 пользователей",
    icon: <FaUsers />,
    dropdown: [
      { name: "ТОП-90 пользователей 1", path: "/top-users-1" },
      { name: "ТОП-90 пользователей 2", path: "/top-users-2" },
    ],
  },
  {
    name: "Ценность альбомов",
    icon: <FaMusic />,
    dropdown: [
      { name: "Ценность альбомов 1", path: "/album-value-1" },
      { name: "Ценность альбомов 2", path: "/album-value-2" },
    ],
  },
  {
    name: "Рейтинг",
    icon: <FaStar />,
    dropdown: [
      { name: "Рейтинг 1", path: "/rating-1" },
      { name: "Рейтинг 2", path: "/rating-2" },
    ],
  },
  {
    name: "Премия РЗТ",
    icon: <FaAward />,
    dropdown: [
      { name: "Премия РЗТ 1", path: "/rzt-award-1" },
      { name: "Премия РЗТ 2", path: "/rzt-award-2" },
    ],
  },
  {
    name: "Фрешмены",
    icon: <FaUserPlus />,
    dropdown: [
      { name: "Фрешмены 1", path: "/freshmen-1" },
      { name: "Фрешмены 2", path: "/freshmen-2" },
    ],
  },
  {
    name: "Плейлисты",
    icon: <FaHeadphones />,
    dropdown: [
      { name: "Плейлисты 1", path: "/playlists-1" },
      { name: "Плейлисты 2", path: "/playlists-2" },
    ],
  },
  {
    name: "Авторские лайки",
    icon: <FaThumbsUp />,
    dropdown: [
      { name: "Авторские лайки 1", path: "/author-likes-1" },
      { name: "Авторские лайки 2", path: "/author-likes-2" },
    ],
  },
  {
    name: "Авторские комментарии",
    icon: <FaComment />,
    dropdown: [
      { name: "Авторские комментарии 1", path: "/author-comments-1" },
      { name: "Авторские комментарии 2", path: "/author-comments-2" },
    ],
  },
  {
    name: "Зарегистрированные авторы",
    icon: <FaUsers />,
    dropdown: [
      { name: "Зарегистрированные авторы 1", path: "/registered-authors-1" },
      { name: "Зарегистрированные авторы 2", path: "/registered-authors-2" },
    ],
  },
  {
    name: "Авторы",
    icon: <FaPen />,
    dropdown: [
      { name: "Авторы 1", path: "/authors-1" },
      { name: "Авторы 2", path: "/authors-2" },
    ],
  },
  { name: "Рецензии", path: "/reviews", icon: <FaBook /> },
  {
    name: "Релизы",
    icon: <FaMusic />,
    dropdown: [
      { name: "Релизы 1", path: "/releases-1" },
      { name: "Релизы 2", path: "/releases-2" },
    ],
  },
];

// Animation variants
const sidebarVariants = {
  open: { x: 0, transition: { duration: 0.3 } },
  closed: { x: "-100%", transition: { duration: 0.3 } },
};

const textVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2, delay: 2 } }, // 2s delay
};

const dropdownVariants = {
  open: { height: "auto", opacity: 1, transition: { duration: 0.2 } },
  closed: { height: 0, opacity: 0, transition: { duration: 0.2 } },
};

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleDropdown = (name: string) =>
    setOpenDropdown(openDropdown === name ? null : name);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="sidebar-toggle"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Desktop Sidebar */}
      <motion.div className="sidebar">
        <div className="sidebar-content">
          {/* Logo (shown on hover) */}
          <div className="sidebar-logo">
            <motion.span
              className="sidebar-logo-text"
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              Music Vibes
            </motion.span>
          </div>

          {/* Menu items */}
          <nav className="sidebar-nav">
            <ul className="sidebar-menu">
              {menuItems.map((item) => (
                <li key={item.name} className="sidebar-item">
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="sidebar-link sidebar-dropdown-toggle"
                      >
                        <span className="sidebar-icon">{item.icon}</span>
                        <motion.span
                          className="sidebar-text"
                          variants={textVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          {item.name}
                        </motion.span>
                        <motion.span
                          className="sidebar-dropdown-icon"
                          variants={textVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <FaAngleDown
                            className={`sidebar-dropdown-arrow ${
                              openDropdown === item.name ? "rotate-180" : ""
                            }`}
                          />
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {openDropdown === item.name && (
                          <motion.ul
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={dropdownVariants}
                            className="sidebar-dropdown"
                          >
                            {item.dropdown.map((subItem) => (
                              <li key={subItem.name} className="sidebar-subitem">
                                <NavLink
                                  to={subItem.path}
                                  className={({ isActive }) =>
                                    `sidebar-sublink ${isActive ? "active" : ""}`
                                  }
                                  onClick={() => setIsOpen(false)}
                                >
                                  {subItem.name}
                                </NavLink>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="sidebar-icon">{item.icon}</span>
                      <motion.span
                        className="sidebar-text"
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {item.name}
                      </motion.span>
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </motion.div>

      {/* Mobile Sidebar */}
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="sidebar-mobile"
      >
        <div className="sidebar-content">
          {/* Logo */}
          <div className="sidebar-logo">
            <span className="sidebar-logo-text">Music Vibes</span>
          </div>

          {/* Menu items */}
          <nav className="sidebar-nav">
            <ul className="sidebar-menu">
              {menuItems.map((item) => (
                <li key={item.name} className="sidebar-item">
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="sidebar-link sidebar-dropdown-toggle"
                      >
                        <span className="sidebar-icon">{item.icon}</span>
                        <span className="sidebar-text">{item.name}</span>
                        <FaAngleDown
                          className={`sidebar-dropdown-arrow ${
                            openDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {openDropdown === item.name && (
                          <motion.ul
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={dropdownVariants}
                            className="sidebar-dropdown"
                          >
                            {item.dropdown.map((subItem) => (
                              <li key={subItem.name} className="sidebar-subitem">
                                <NavLink
                                  to={subItem.path}
                                  className={({ isActive }) =>
                                    `sidebar-sublink ${isActive ? "active" : ""}`
                                  }
                                  onClick={() => setIsOpen(false)}
                                >
                                  {subItem.name}
                                </NavLink>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="sidebar-icon">{item.icon}</span>
                      <span className="sidebar-text">{item.name}</span>
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </motion.div>

      {/* Overlay for mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar} />}
    </>
  );
}

export default Sidebar;
 