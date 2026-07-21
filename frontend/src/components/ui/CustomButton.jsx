import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const CustomButton = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 10px 25px -5px rgba(109, 93, 246, 0.4), 0 8px 10px -6px rgba(109, 93, 246, 0.4)" 
      }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "px-6 py-3 rounded-xl bg-[#6D5DF6] text-white font-semibold hover:bg-[#4F46E5] transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default CustomButton;