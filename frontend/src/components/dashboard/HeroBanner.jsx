import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeroBanner({ user, isNewUser }) {
  const navigate = useNavigate();
  const username = user?.username || "Traveler";

  return (
    <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-8 text-white shadow-lg animate-fade-in">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-blue-100 mb-4 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold w-fit">
            <Sparkles size={14} className="animate-spin" />
            <span>AI Powered Travel Planning</span>
          </div>

          <h2 className="text-4xl font-bold leading-tight">
            {isNewUser ? `Hi ${username}, Start Your Travel Journey!` : `Welcome back, ${username}! 👋`}
          </h2>

          <p className="mt-4 text-indigo-100 text-lg">
            {isNewUser
              ? "You haven't planned any trips yet. Create your first customized travel plan in seconds using our real-time AI Travel Planner!"
              : "Ready for your next adventure? Let our AI plan another personalized itinerary optimized for weather, budget, and local sights!"}
          </p>

          <button
            onClick={() => navigate("/planner")}
            className="mt-6 bg-white text-indigo-700 px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition hover:shadow-lg active:scale-95 text-sm"
          >
            {isNewUser ? "Plan Your First Trip" : "Plan a New Trip"}
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
            <h3 className="text-2xl font-extrabold">120+</h3>
            <p className="text-indigo-100 text-sm mt-1">Countries Supported</p>
          </div>

          <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
            <h3 className="text-2xl font-extrabold">50K+</h3>
            <p className="text-indigo-100 text-sm mt-1">Trips Planned</p>
          </div>

          <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
            <h3 className="text-2xl font-extrabold">98%</h3>
            <p className="text-indigo-100 text-sm mt-1">Happy Travelers</p>
          </div>

          <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
            <h3 className="text-2xl font-extrabold">24/7</h3>
            <p className="text-indigo-100 text-sm mt-1">Real-time Assistance</p>
          </div>
        </div>
      </div>
    </section>
  );
}