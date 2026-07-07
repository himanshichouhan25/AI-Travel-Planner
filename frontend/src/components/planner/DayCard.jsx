import { Clock, MapPin, CalendarDays } from "lucide-react";

const DayCard = ({ dayData }) => {
  if (!dayData) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 p-6 hover:shadow-xl transition duration-300">
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
        <CalendarDays className="text-indigo-500 animate-pulse" />
        {dayData.title || `Day ${dayData.day}`}
      </h3>
      <div className="space-y-4">
        {dayData.activities && dayData.activities.map((activity, idx) => (
          <div key={idx} className="relative pl-5 border-l-2 border-indigo-100 dark:border-indigo-900/50 last:border-0 pb-1">
            <div className="absolute -left-[6px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
            <div className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
              <Clock size={12} />
              {activity.time}
            </div>
            <div className="font-semibold text-slate-800 dark:text-slate-200 mt-1">{activity.description}</div>
            {activity.location && (
              <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 text-xs mt-1">
                <MapPin size={12} />
                {activity.location}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayCard;