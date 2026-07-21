import { motion } from "framer-motion";
import { Compass, Coins, Search, Brain } from "lucide-react";
import GlassCard from "../ui/GlassCard";

const About = () => {
  return (
    <section id="about" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-950/40 text-indigo-750 dark:text-indigo-400 text-sm font-semibold mb-4"
          >
            <Brain size={16} />
            How It Works
          </motion.div>
          
          <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-100">
            About Our Multi-Agent System
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-2xl mx-auto text-base leading-relaxed">
            AI Travel Planner uses cooperative artificial intelligence. Instead of relying on a single general response, our system coordinates specialized AI agents that review and refine every aspect of your journey.
          </p>
        </div>

        {/* Multi-Agent Architecture Showcase */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Card 1: Planner Agent */}
          <GlassCard className="p-8 hover:-translate-y-2 transition duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center text-[#6D5DF6] dark:text-indigo-400 mb-6">
                <Compass size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                🧭 Planner Agent
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                Acts as your digital tour guide. It dynamically searches destinations, creates logical routes, discovers highly-rated attractions, and maps out a day-by-day itinerary tailored to your interests.
              </p>
            </div>
            <div className="text-xs font-semibold text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/20 px-3 py-1.5 rounded-lg w-max">
              Focus: Custom Route Building
            </div>
          </GlassCard>

          {/* Card 2: Budget Agent */}
          <GlassCard className="p-8 hover:-translate-y-2 transition duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
                <Coins size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                💰 Budget Agent
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                Monitors travel expenses in real-time. It calculates expected attraction tickets, estimates hotel night ranges, optimizes transport options, and ensures your itinerary aligns with your budget level.
              </p>
            </div>
            <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1.5 rounded-lg w-max">
              Focus: Cost Minimization
            </div>
          </GlassCard>

          {/* Card 3: Reflection Agent */}
          <GlassCard className="p-8 hover:-translate-y-2 transition duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-650 dark:text-indigo-400 mb-6">
                <Search size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                🔍 Reflection Agent
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                The final quality controller. It reviews the work of both Planner and Budget agents, sanity-checks the travel pace, checks local weather forecasts, and rewrites elements for a polished, error-free result.
              </p>
            </div>
            <div className="text-xs font-semibold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/20 px-3 py-1.5 rounded-lg w-max">
              Focus: Review & Quality Assurance
            </div>
          </GlassCard>

        </div>

        {/* Additional Detail Block */}
        <div className="mt-16 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-8 lg:p-12 shadow-lg flex flex-col lg:flex-row items-center gap-8 transition-colors duration-300">
          <div className="flex-1">
            <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              Why Collaborative AI Agents?
            </h4>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
              Traditional AI models try to answer your request in one go, often overlooking budget restrictions, routing logic, or local factors like weather constraints.
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              By separating these concerns into specialized agents, they can review each other's outputs, double check numbers, and ensure that the final itinerary is high quality and viable for real-world travel.
            </p>
          </div>
          <div className="w-full lg:w-72 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-950/30 dark:to-indigo-950/30 p-6 rounded-2xl border border-purple-200/50 dark:border-indigo-900/30">
            <div className="text-center font-bold text-slate-800 dark:text-slate-200 mb-3 text-sm">
              Our Core Engine
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">✨ FastAPI Backend Core</li>
              <li className="flex items-center gap-2">🤖 Advanced CrewAI Orchestration</li>
              <li className="flex items-center gap-2">⚡ Ultra-fast Groq Inference</li>
              <li className="flex items-center gap-2">⚛️ React & Tailwind Frontend</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
