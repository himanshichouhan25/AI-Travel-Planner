import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import CustomButton from "../ui/CustomButton";
import GlassCard from "../ui/GlassCard";
import CanvasBackground from "./CanvasBackground";

const cardContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.35,
    },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, x: 30 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 85,
      damping: 14,
    },
  },
};

const Hero = () => {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-100 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950/20 pt-16 transition-colors duration-300">
      <CanvasBackground />
      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center relative z-10">

        {/* Left Side */}
        <div>
          <motion.div 
            animate={{ 
              scale: [1, 1.02, 1],
              boxShadow: [
                "0 0 0 0 rgba(109, 93, 246, 0)",
                "0 0 12px 2px rgba(109, 93, 246, 0.2)",
                "0 0 0 0 rgba(109, 93, 246, 0)"
              ]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 font-medium mb-6"
          >
            <Sparkles size={18} />
            AI Powered Travel Planning
          </motion.div>

          <h1 className="text-6xl font-bold leading-tight text-slate-800 dark:text-slate-100">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-block"
            >
              Plan Smarter.
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              className="inline-block"
            >
              Travel Better.
            </motion.span>
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            className="mt-6 text-slate-600 dark:text-slate-300 text-lg leading-8"
          >
            Create personalized travel itineraries with AI. Discover hotels,
            attractions, weather insights and optimize your budget in seconds.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
            className="mt-8 flex gap-4"
          >
            <CustomButton>
              Start Planning
            </CustomButton>

            <motion.button 
              whileHover={{ 
                scale: 1.03, 
                backgroundColor: "rgba(109, 93, 246, 0.05)",
                borderColor: "rgba(109, 93, 246, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-xl border border-gray-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>

        {/* Right Side */}
        <div className="relative">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <GlassCard className="p-6">
              <h3 className="font-bold text-xl mb-4 text-slate-800 dark:text-slate-100">
                ✈️ AI Generated Itinerary
              </h3>

              <motion.div 
                variants={cardContainerVariants}
                initial="hidden"
                animate="show"
                className="space-y-3 font-semibold text-slate-700 dark:text-slate-200"
              >
                <motion.div variants={cardItemVariants} className="bg-purple-100/70 dark:bg-purple-950/40 border border-purple-200/50 dark:border-purple-900/30 rounded-lg p-3 text-purple-800 dark:text-purple-400">
                  📍 Jaipur City Palace
                </motion.div>

                <motion.div variants={cardItemVariants} className="bg-blue-100/70 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-900/30 rounded-lg p-3 text-blue-800 dark:text-blue-400">
                  ☀️ Weather: 28°C Sunny
                </motion.div>

                <motion.div variants={cardItemVariants} className="bg-emerald-100/70 dark:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-900/30 rounded-lg p-3 text-emerald-800 dark:text-emerald-400">
                  💰 Budget Optimized
                </motion.div>

                <motion.div variants={cardItemVariants} className="bg-amber-100/70 dark:bg-amber-950/40 border border-amber-200/50 dark:border-amber-900/30 rounded-lg p-3 text-amber-800 dark:text-amber-400">
                  🏨 Hotel Recommended
                </motion.div>
              </motion.div>

              <motion.button 
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 25px -5px rgba(109, 93, 246, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 w-full bg-[#6D5DF6] text-white rounded-xl py-3.5 flex justify-center items-center gap-2 hover:bg-[#4F46E5] transition font-bold shadow-md shadow-indigo-500/10 cursor-pointer"
              >
                Generate Trip
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ArrowRight size={18} />
                </motion.span>
              </motion.button>
            </GlassCard>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Hero;