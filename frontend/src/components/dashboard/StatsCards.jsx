import { Plane, Globe, Wallet, MapPinned } from "lucide-react";

export default function StatsCards({ trips = [] }) {
  const totalTrips = trips.length;
  
  // Calculate unique destinations
  const uniqueDestinations = new Set(trips.map((t) => t.destination.trim().toLowerCase())).size;

  // Calculate total budget
  const totalBudget = trips.reduce((sum, t) => sum + (t.budget || 0), 0);

  // Status breakdown: active plans
  const activePlans = trips.filter(
    (t) => t.status === "planned" || t.status === "active" || t.status === "upcoming"
  ).length;

  const stats = [
    {
      title: "Trips Created",
      value: totalTrips,
      icon: Plane,
      color: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/30",
    },
    {
      title: "Destinations Explored",
      value: uniqueDestinations,
      icon: Globe,
      color: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30",
    },
    {
      title: "Total Budget Invested",
      value: `₹${totalBudget.toLocaleString()}`,
      icon: Wallet,
      color: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/30",
    },
    {
      title: "Active Itineraries",
      value: activePlans,
      icon: MapPinned,
      color: "bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border-violet-100 dark:border-violet-900/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 hover:shadow-xl transition duration-300 shadow-sm"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${stat.color}`}>
              <Icon size={22} />
            </div>

            <h2 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-5">
              {stat.value}
            </h2>

            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              {stat.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}