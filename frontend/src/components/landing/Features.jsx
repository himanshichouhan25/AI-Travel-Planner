import {
  Brain,
  MapPinned,
  Wallet,
  CloudSun,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Trip Planning",
    description: "Generate personalized itineraries in seconds.",
  },
  {
    icon: MapPinned,
    title: "Nearby Attractions",
    description: "Discover famous places around your destination.",
  },
  {
    icon: Wallet,
    title: "Budget Optimization",
    description: "Travel smarter without overspending.",
  },
  {
    icon: CloudSun,
    title: "Live Weather",
    description: "Get real-time weather before your trip.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-4 text-slate-800 dark:text-slate-100">
          Why Choose AI Travel Planner?
        </h2>

        <p className="text-center text-slate-500 dark:text-slate-400 mb-14 text-sm font-semibold">
          Everything you need to plan your perfect trip.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="rounded-3xl bg-white dark:bg-slate-800/40 shadow-lg border border-slate-100 dark:border-slate-800/60 p-8 hover:-translate-y-2 transition duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center mb-5">
                  <Icon className="text-[#6D5DF6] dark:text-indigo-400" size={28} />
                </div>

                <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-slate-205">
                  {feature.title}
                </h3>

                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Features;