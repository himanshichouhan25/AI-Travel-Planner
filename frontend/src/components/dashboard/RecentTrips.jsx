import { Calendar, Wallet, ArrowRight, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RecentTrips({ trips = [], isNewUser }) {
  const navigate = useNavigate();

  // Show up to 2 recent trips
  const displayedTrips = trips.slice(0, 2);

  const defaultImages = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800", // Beach
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800", // Mountain
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800", // City
  ];

  const getTripImage = (destination, index) => {
    const dest = destination.toLowerCase();
    if (dest.includes("goa") || dest.includes("beach") || dest.includes("bali")) return defaultImages[0];
    if (dest.includes("mountain") || dest.includes("manali") || dest.includes("leh")) return defaultImages[1];
    return defaultImages[index % defaultImages.length];
  };

  const getTripDateFormatted = (trip) => {
    if (!trip.start_date || !trip.end_date) return "Dates flexible";
    try {
      const start = new Date(trip.start_date).toLocaleDateString("en-US", { day: "numeric", month: "short" });
      const end = new Date(trip.end_date).toLocaleDateString("en-US", { day: "numeric", month: "short" });
      return `${start} - ${end}`;
    } catch {
      return "Dates flexible";
    }
  };

  return (
    <section className="mt-8">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Your Recent Trips</h2>
        {trips.length > 0 && (
          <button
            onClick={() => navigate("/trips")}
            className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1 text-sm"
          >
            View All Trips <ArrowRight size={14} />
          </button>
        )}
      </div>

      {isNewUser ? (
        <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 text-center py-12">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/35 flex items-center justify-center mx-auto text-indigo-600 dark:text-indigo-400 mb-4">
            <Compass size={28} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No Trips Created Yet</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mx-auto mt-2 leading-relaxed">
            You don't have any saved travel plans. Use the AI Travel Planner to generate a custom itinerary.
          </p>
          <button
            onClick={() => navigate("/planner")}
            className="mt-5 bg-indigo-600 dark:bg-indigo-500 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-600 transition shadow-sm text-sm"
          >
            Create Your First Trip
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedTrips.map((trip, idx) => (
            <div
              key={trip.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-xl transition duration-300 shadow-sm flex flex-col justify-between"
            >
              <div>
                <img
                  src={getTripImage(trip.destination, idx)}
                  alt={trip.destination}
                  className="w-full h-48 object-cover"
                />

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 truncate">
                    {trip.destination}
                  </h3>

                  <div className="flex items-center gap-2 mt-4 text-slate-500 dark:text-slate-400 text-sm">
                    <Calendar size={16} className="text-indigo-500 dark:text-indigo-400" />
                    {getTripDateFormatted(trip)}
                  </div>

                  <div className="flex items-center gap-2 mt-2.5 text-slate-500 dark:text-slate-400 text-sm">
                    <Wallet size={16} className="text-indigo-500 dark:text-indigo-400" />
                    Budget: ₹{trip.budget.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex justify-between items-center border-t border-slate-50 dark:border-slate-800">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/35">
                  {trip.status || "Planned"}
                </span>

                <button
                  onClick={() => navigate("/trips")}
                  className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 text-sm font-bold hover:gap-2.5 transition-all"
                >
                  View Details
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}