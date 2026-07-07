import { Sparkles, MapPin, Wallet, CloudSun, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RecommendationCard({ preferences }) {
  const navigate = useNavigate();

  const getRecommendation = () => {
    const dest = (preferences?.preferred_destination_type || "").toLowerCase();
    const budget = (preferences?.budget_range || "").toLowerCase();

    if (dest.includes("beach")) {
      if (budget.includes("lux")) {
        return {
          title: "Maldives 🇲🇻",
          season: "Nov - Apr",
          budget: "₹1,50,000",
          rawBudget: "150000",
          weather: "29°C Sunny",
          tagline: "Ultra-luxury water villas and crystal clear oceans.",
          style: "Luxury"
        };
      }
      return {
        title: "Goa, India 🏖️",
        season: "Nov - Feb",
        budget: "₹25,000",
        rawBudget: "25000",
        weather: "31°C Humid",
        tagline: "Vibrant beach parties, historical churches, and fresh seafood.",
        style: "Standard"
      };
    }

    if (dest.includes("mountain") || dest.includes("hill")) {
      if (budget.includes("lux")) {
        return {
          title: "Zermatt, Switzerland 🇨🇭",
          season: "Dec - Mar",
          budget: "₹2,20,000",
          rawBudget: "220000",
          weather: "-4°C Snowy",
          tagline: "High-end ski resorts and pristine views of the Matterhorn.",
          style: "Luxury"
        };
      }
      return {
        title: "Manali, India 🏔️",
        season: "Oct - Jun",
        budget: "₹18,000",
        rawBudget: "18000",
        weather: "15°C Cool",
        tagline: "Spectacular valleys, river rafting, and snowy mountaintops.",
        style: "Standard"
      };
    }

    if (dest.includes("city") || dest.includes("urban")) {
      return {
        title: "Tokyo, Japan 🇯🇵",
        season: "Mar - May",
        budget: "₹1,10,000",
        rawBudget: "110000",
        weather: "18°C Mild",
        tagline: "Stunning neon skyscrapers, historic temples, and incredible street food.",
        style: "Standard"
      };
    }

    if (dest.includes("nature") || dest.includes("wild")) {
      return {
        title: "Serengeti, Tanzania 🇹🇿",
        season: "Jun - Oct",
        budget: "₹1,85,000",
        rawBudget: "185000",
        weather: "25°C Dry",
        tagline: "World-famous safaris, wildebeest migration, and luxury lodge glamping.",
        style: "Standard"
      };
    }

    // Default recommendation if no preferences or matching type
    return {
      title: "Kyoto, Japan 🇯🇵",
      season: "Mar - Apr",
      budget: "₹95,000",
      rawBudget: "95000",
      weather: "16°C Sunny",
      tagline: "Famous cherry blossom seasons, Zen gardens, and traditional tea houses.",
      style: "Standard"
    };
  };

  const rec = getRecommendation();

  const handleGenerateItinerary = () => {
    // Navigate to planner page with query parameters to prefill values
    const cleanTitle = rec.title.split(",")[0].split(" ")[0].trim();
    navigate(`/planner?destination=${cleanTitle}&budget=${rec.rawBudget}&travel_style=${rec.style}`);
  };

  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-6 mt-8 border border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="flex items-center gap-2 mb-5">
        <Sparkles className="text-purple-600 dark:text-purple-400" size={22} />
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          AI Recommendations For You
        </h2>
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg shadow-purple-500/10">
        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-12 translate-y-12">
          <Compass size={300} />
        </div>

        <div className="relative z-10">
          <p className="text-xs uppercase tracking-wider font-semibold opacity-85">
            Based on your Saved Preferences
          </p>

          <h3 className="text-3xl font-extrabold mt-2">
            {rec.title}
          </h3>
          <p className="text-sm opacity-90 mt-2 max-w-xl">
            {rec.tagline}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/5">
              <CloudSun size={18} className="text-purple-200" />
              <p className="mt-2 text-xs opacity-80">Season & Climate</p>
              <h4 className="font-bold text-sm mt-0.5">{rec.season}</h4>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/5">
              <Wallet size={18} className="text-purple-200" />
              <p className="mt-2 text-xs opacity-80">Estimated Budget</p>
              <h4 className="font-bold text-sm mt-0.5">{rec.budget}</h4>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/5">
              <Compass size={18} className="text-purple-200" />
              <p className="mt-2 text-xs opacity-80">Travel Style Match</p>
              <h4 className="font-bold text-sm mt-0.5">{rec.style} style</h4>
            </div>
          </div>

          <button
            onClick={handleGenerateItinerary}
            className="mt-6 bg-white text-purple-700 px-6 py-3.5 rounded-xl font-bold hover:scale-105 active:scale-95 transition shadow-md shadow-purple-900/20 text-sm"
          >
            Generate Full Itinerary
          </button>
        </div>
      </div>
    </section>
  );
}