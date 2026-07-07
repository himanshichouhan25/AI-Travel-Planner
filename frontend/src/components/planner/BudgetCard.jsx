import { Coins, Lightbulb, Hotel, Utensils, Car, Ticket, ShoppingBag } from "lucide-react";

const BudgetCard = ({ budget, travelStyle, tips }) => {
  const style = (travelStyle || "standard").toLowerCase();

  // Define distribution ratios matching the backend budget tool logic
  let distribution = {
    hotel: 0.40,
    food: 0.20,
    transport: 0.20,
    activities: 0.15,
    misc: 0.05
  };

  if (style === "budget") {
    distribution = { hotel: 0.30, food: 0.25, transport: 0.20, activities: 0.15, misc: 0.10 };
  } else if (style === "luxury") {
    distribution = { hotel: 0.50, food: 0.20, transport: 0.15, activities: 0.10, misc: 0.05 };
  }

  // Pre-calculate categories details
  const breakdown = [
    {
      name: "Hotel & Lodging",
      amount: budget * distribution.hotel,
      percentage: distribution.hotel * 100,
      color: "bg-blue-500",
      bgLight: "bg-blue-50 dark:bg-blue-950/30",
      textColor: "text-blue-600 dark:text-blue-400",
      borderColor: "border-blue-100 dark:border-blue-900/30",
      icon: Hotel
    },
    {
      name: "Food & Dining",
      amount: budget * distribution.food,
      percentage: distribution.food * 100,
      color: "bg-emerald-500",
      bgLight: "bg-emerald-50 dark:bg-emerald-950/30",
      textColor: "text-emerald-600 dark:text-emerald-400",
      borderColor: "border-emerald-100 dark:border-emerald-900/30",
      icon: Utensils
    },
    {
      name: "Transport & Fuel",
      amount: budget * distribution.transport,
      percentage: distribution.transport * 100,
      color: "bg-indigo-500",
      bgLight: "bg-indigo-50 dark:bg-indigo-950/30",
      textColor: "text-indigo-600 dark:text-indigo-400",
      borderColor: "border-indigo-100 dark:border-indigo-900/30",
      icon: Car
    },
    {
      name: "Sights & Activities",
      amount: budget * distribution.activities,
      percentage: distribution.activities * 100,
      color: "bg-purple-500",
      bgLight: "bg-purple-50 dark:bg-purple-950/30",
      textColor: "text-purple-600 dark:text-purple-400",
      borderColor: "border-purple-100 dark:border-purple-900/30",
      icon: Ticket
    },
    {
      name: "Miscellaneous & Cash",
      amount: budget * distribution.misc,
      percentage: distribution.misc * 100,
      color: "bg-amber-500",
      bgLight: "bg-amber-50 dark:bg-amber-950/30",
      textColor: "text-amber-600 dark:text-amber-400",
      borderColor: "border-amber-100 dark:border-amber-900/30",
      icon: ShoppingBag
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 p-6 hover:shadow-xl transition duration-300 transition-colors duration-300">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
        <Coins className="text-amber-500" />
        Budget Distributor ({travelStyle || "Standard"})
      </h2>

      {/* Main Budget Display */}
      <div className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/35 border border-amber-200 dark:border-amber-900/35 flex justify-between items-center">
        <div>
          <div className="text-xs text-amber-800 dark:text-amber-300 font-semibold uppercase tracking-wider">Total Allocated Budget</div>
          <div className="text-3xl font-extrabold text-amber-900 dark:text-amber-100 mt-1">₹{budget.toLocaleString()}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-amber-700 dark:text-amber-300 font-semibold">Per Day Average</div>
          <div className="text-lg font-bold text-amber-800 dark:text-amber-200 mt-1">
            ₹{Math.round(budget / 3).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Stacked Proportional Progress Bar */}
      <div className="w-full h-4.5 rounded-full overflow-hidden flex mb-6 bg-slate-100 dark:bg-slate-800">
        {breakdown.map((cat, idx) => (
          <div
            key={idx}
            style={{ width: `${cat.percentage}%` }}
            className={`${cat.color} h-full transition-all duration-500 hover:opacity-90`}
            title={`${cat.name}: ${cat.percentage}%`}
          />
        ))}
      </div>

      {/* Itemized Distribution List */}
      <div className="space-y-4 mb-6">
        <h3 className="font-semibold text-slate-700 dark:text-slate-200 text-sm">Distributed Allocation Breakdown</h3>
        {breakdown.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
                  <span className={`p-1.5 rounded-lg border ${cat.bgLight} ${cat.textColor} ${cat.borderColor}`}>
                    <Icon size={14} />
                  </span>
                  <span>{cat.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-800 dark:text-slate-200">₹{cat.amount.toLocaleString()}</span>
                  <span className="text-slate-400 text-xs ml-1.5">({cat.percentage}%)</span>
                </div>
              </div>
              
              {/* Progress Slider */}
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  style={{ width: `${cat.percentage}%` }}
                  className={`h-full ${cat.color} rounded-full`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Budget Tips */}
      {tips && tips.length > 0 && (
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2 text-sm">
            <Lightbulb className="text-amber-500 animate-pulse" size={16} />
            Budget Tips & Optimization
          </h3>
          <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-xs">
            {tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-slate-50 dark:bg-slate-850 rounded-lg p-2.5 border border-slate-100/60 dark:border-slate-800/80 leading-relaxed">
                <span className="text-amber-500 shrink-0 font-bold">💡</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BudgetCard;