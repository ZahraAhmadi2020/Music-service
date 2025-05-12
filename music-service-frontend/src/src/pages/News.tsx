 
import { motion } from "framer-motion";
 import "./News.css";

function News() {
  return (
    <div className="news-container">
       <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="news-content"
      >
        <h1 className="news-title">Новости</h1>
        <p className="news-text">Это страница новостей.</p>
      </motion.div>
    </div>
  );
}

export default News;
 