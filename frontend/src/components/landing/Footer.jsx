import { Plane } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 text-slate-600 dark:text-slate-400 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col md:flex-row justify-between items-center">

          <div className="flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
            <Plane className="text-[#6D5DF6] dark:text-indigo-400" />
            AI Travel Planner
          </div>

          <div className="flex gap-8 mt-8 md:mt-0 text-sm font-medium">
            <a href="#home" className="hover:text-[#6D5DF6] dark:hover:text-indigo-400 transition-colors duration-300">Home</a>
            <a href="#features" className="hover:text-[#6D5DF6] dark:hover:text-indigo-400 transition-colors duration-300">Features</a>
            <a href="#pricing" className="hover:text-[#6D5DF6] dark:hover:text-indigo-400 transition-colors duration-300">Pricing</a>
            <a href="#pricing" className="hover:text-[#6D5DF6] dark:hover:text-indigo-400 transition-colors duration-300">Contact</a>
          </div>

        </div>

        <div className="border-t border-slate-200 dark:border-slate-900 mt-10 pt-6 text-center text-xs text-slate-400 dark:text-slate-500">
          © 2026 AI Travel Planner. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;