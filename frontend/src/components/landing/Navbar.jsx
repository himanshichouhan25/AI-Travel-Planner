import { Link } from "react-router-dom";
import { Plane, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import CustomButton from "../ui/CustomButton";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-b border-gray-200 dark:border-slate-800 shadow-sm transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-[#6D5DF6] dark:text-indigo-400"
        >
          <Plane size={28} />
          AI Travel Planner
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 font-medium text-slate-600 dark:text-slate-300">
          <a href="#home" className="hover:text-[#6D5DF6] dark:hover:text-indigo-400 transition-colors duration-350">Home</a>
          <a href="#destinations" className="hover:text-[#6D5DF6] dark:hover:text-indigo-400 transition-colors duration-350">Destinations</a>
          <a href="#features" className="hover:text-[#6D5DF6] dark:hover:text-indigo-400 transition-colors duration-350">Features</a>
          <a href="#pricing" className="hover:text-[#6D5DF6] dark:hover:text-indigo-400 transition-colors duration-350">Pricing</a>
          <a href="#about" className="hover:text-[#6D5DF6] dark:hover:text-indigo-400 transition-colors duration-350">About</a>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link
            to="/login"
            className="hidden md:block text-slate-600 dark:text-slate-300 font-medium hover:text-indigo-650"
          >
            Login
          </Link>

          <Link to="/register">
            <CustomButton>
              Get Started
            </CustomButton>
          </Link>

        </div>

      </div>
    </motion.nav>
  );
};

export default Navbar;