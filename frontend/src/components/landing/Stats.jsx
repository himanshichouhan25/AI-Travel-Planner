import {
  Globe,
  Plane,
  Calendar,
  Sparkles,
} from "lucide-react";

const stats = [
  {
    icon: Plane,
    number: "50K+",
    title: "Trips Planned",
  },
  {
    icon: Globe,
    number: "120+",
    title: "Countries",
  },
  {
    icon: Calendar,
    number: "98%",
    title: "Happy Travelers",
  },
  {
    icon: Sparkles,
    number: "24/7",
    title: "AI Assistant",
  },
];

const Stats = () => {
  return (
    <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-3xl p-8 bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 shadow-lg hover:-translate-y-2 transition duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center mb-6">
                  <Icon className="text-[#6D5DF6] dark:text-indigo-400" />
                </div>

                <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-100">
                  {item.number}
                </h2>

                <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm font-semibold">
                  {item.title}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default Stats;