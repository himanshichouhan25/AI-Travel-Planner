import { ArrowRight, Sparkles } from "lucide-react";
import CustomButton from "../ui/CustomButton";
import GlassCard from "../ui/GlassCard";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-100 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950/20 pt-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Side */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 font-medium mb-6">
            <Sparkles size={18} />
            AI Powered Travel Planning
          </div>

          <h1 className="text-6xl font-bold leading-tight text-slate-800 dark:text-slate-100">
            Plan Smarter.
            <br />
            Travel Better.
          </h1>

          <p className="mt-6 text-slate-600 dark:text-slate-350 text-lg leading-8">
            Create personalized travel itineraries with AI. Discover hotels,
            attractions, weather insights and optimize your budget in seconds.
          </p>

          <div className="mt-8 flex gap-4">
            <CustomButton>
              Start Planning
            </CustomButton>

            <button className="px-6 py-3 rounded-xl border border-gray-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative">

          <GlassCard className="p-6">
            <h3 className="font-bold text-xl mb-4 text-slate-800 dark:text-slate-100">
              ✈️ AI Generated Itinerary
            </h3>

            <div className="space-y-3 font-semibold text-slate-700 dark:text-slate-200">
              <div className="bg-purple-100/70 dark:bg-purple-950/40 border border-purple-200/50 dark:border-purple-900/30 rounded-lg p-3 text-purple-800 dark:text-purple-400">
                📍 Jaipur City Palace
              </div>

              <div className="bg-blue-100/70 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-900/30 rounded-lg p-3 text-blue-800 dark:text-blue-400">
                ☀️ Weather: 28°C Sunny
              </div>

              <div className="bg-emerald-100/70 dark:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-900/30 rounded-lg p-3 text-emerald-800 dark:text-emerald-400">
                💰 Budget Optimized
              </div>

              <div className="bg-amber-100/70 dark:bg-amber-950/40 border border-amber-200/50 dark:border-amber-900/30 rounded-lg p-3 text-amber-800 dark:text-amber-400">
                🏨 Hotel Recommended
              </div>
            </div>

            <button className="mt-6 w-full bg-[#6D5DF6] text-white rounded-xl py-3.5 flex justify-center items-center gap-2 hover:bg-[#4F46E5] transition font-bold shadow-md shadow-indigo-500/10">
              Generate Trip
              <ArrowRight size={18} />
            </button>
          </GlassCard>

        </div>

      </div>
    </section>
  );
};

export default Hero;