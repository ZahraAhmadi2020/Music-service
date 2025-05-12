import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

function TrackDetails() {
  const { id } = useParams();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 text-white"
    >
      <h1 className="text-3xl font-bold">جزئیات آهنگ {id}</h1>
      <p>اینجا جزئیات آهنگ نمایش داده می‌شه.</p>
    </motion.div>
  );
}

export default TrackDetails;