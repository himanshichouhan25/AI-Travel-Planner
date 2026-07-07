import { Home, MapPin, Sparkles } from "lucide-react";

const TripSummary = ({ summary, hotels }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 p-6 hover:shadow-xl transition duration-300">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
        <MapPin className="text-blue-500" />
        Trip Overview
      </h2>
      <p className="text-slate-650 dark:text-slate-300 leading-relaxed mb-6">{summary}</p>

      {hotels && hotels.length > 0 && (
        <div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <Home className="text-emerald-500" size={18} />
            Recommended Hotels
          </h3>
          <div className="space-y-4">
            {hotels.map((hotel, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-850 rounded-xl p-4 border border-slate-100/60 dark:border-slate-800/80">
                <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-450 text-xs font-bold">
                    {idx + 1}
                  </span>
                  {hotel.name}
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-sm mt-1">{hotel.address}</div>
                {hotel.reason && (
                  <div className="text-slate-600 dark:text-slate-350 text-sm mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-800 italic flex items-start gap-1">
                    <Sparkles className="text-amber-500 shrink-0 mt-0.5" size={14} />
                    <span>{hotel.reason}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TripSummary;