import { CloudRain, CheckSquare } from "lucide-react";

const WeatherCard = ({ weatherSummary, packingList }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 p-6 hover:shadow-xl transition duration-300">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
        <CloudRain className="text-blue-500" />
        Weather & Packing List
      </h2>
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">{weatherSummary}</p>

      {packingList && packingList.length > 0 && (
        <div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <CheckSquare className="text-blue-500" size={18} />
            Recommended Packing List
          </h3>
          <ul className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-350 text-sm">
            {packingList.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-850 rounded-lg p-2 border border-slate-100/60 dark:border-slate-800/80">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                <span className="truncate">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;