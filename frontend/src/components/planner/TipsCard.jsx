import { ShieldCheck } from "lucide-react";

const TipsCard = ({ tips }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 p-6 hover:shadow-xl transition duration-300">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
        <ShieldCheck className="text-rose-500" />
        Travel & Safety Tips
      </h2>

      {tips && tips.length > 0 && (
        <ul className="space-y-3 text-slate-600 dark:text-slate-350 text-sm">
          {tips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-2.5 bg-slate-50 dark:bg-slate-850 rounded-xl p-3.5 border border-slate-100/60 dark:border-slate-800/80">
              <span className="text-rose-500 shrink-0 font-semibold">⚠️</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TipsCard;