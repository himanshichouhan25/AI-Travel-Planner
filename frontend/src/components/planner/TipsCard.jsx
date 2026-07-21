import { ShieldCheck, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const TipsCard = ({ tips }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 p-6 hover:shadow-xl transition duration-300">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
        <ShieldCheck className="text-purple-600 dark:text-purple-400" />
        Travel & Safety Tips
      </h2>

      {tips && tips.length > 0 && (
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-3"
        >
          {tips.map((tip, idx) => (
            <motion.li
              key={idx}
              variants={itemVariants}
              className="flex items-start gap-3 bg-purple-50/20 dark:bg-purple-950/10 rounded-xl p-3.5 border border-purple-100/30 dark:border-purple-900/20"
            >
              <span className="text-purple-600 dark:text-purple-400 shrink-0 mt-0.5">
                <AlertCircle size={16} />
              </span>
              <span className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{tip}</span>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default TipsCard;