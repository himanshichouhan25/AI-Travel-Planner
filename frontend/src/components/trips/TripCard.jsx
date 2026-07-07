import { Calendar, MapPin, IndianRupee, Pencil, Trash2 } from "lucide-react";

const TripCard = ({ trip, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition transition-colors duration-300">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100">
            <MapPin className="text-indigo-500" size={20} />
            {trip.destination}
          </h2>

          <p className="mt-3 flex items-center gap-2 text-slate-650 dark:text-slate-400 text-sm">
            <IndianRupee size={16} className="text-slate-400" />
            Budget: ₹{trip.budget.toLocaleString()}
          </p>

          <p className="flex items-center gap-2 text-slate-650 dark:text-slate-400 mt-2 text-sm">
            <Calendar size={16} className="text-slate-400" />
            {trip.start_date} → {trip.end_date}
          </p>

          <span className="inline-block mt-4 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200/50 dark:border-blue-900/30 text-xs font-semibold uppercase tracking-wider">
            {trip.status}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(trip)}
            className="p-2 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-100/50 dark:border-amber-900/30 text-amber-600 dark:text-amber-400 transition"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(trip)}
            className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-100/50 dark:border-rose-900/30 text-rose-600 dark:text-rose-400 transition"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;