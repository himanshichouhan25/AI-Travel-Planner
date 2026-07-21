import { useState, useEffect, useRef } from "react";
import { Globe, Plane, Calendar, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    icon: Plane,
    number: "50",
    suffix: "K+",
    title: "Trips Planned",
  },
  {
    icon: Globe,
    number: "120",
    suffix: "+",
    title: "Countries",
  },
  {
    icon: Calendar,
    number: "98",
    suffix: "%",
    title: "Happy Travelers",
  },
  {
    icon: Sparkles,
    number: "24",
    suffix: "/7",
    title: "AI Assistant",
  },
];

const CountUp = ({ end, duration = 1500, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const endNum = parseInt(end, 10);
    if (isNaN(endNum)) {
      setCount(end);
      return;
    }

    const totalSteps = 60;
    const stepTime = duration / totalSteps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / totalSteps;
      const easedProgress = progress * (2 - progress); // easeOutQuad
      const currentCount = Math.round(easedProgress * endNum);
      
      setCount(currentCount);

      if (step >= totalSteps) {
        setCount(endNum);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasStarted, end, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
};

const Stats = () => {
  return (
    <section id="destinations" className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="rounded-3xl p-8 bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 shadow-lg hover:-translate-y-2 transition duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center mb-6">
                  <Icon className="text-[#6D5DF6] dark:text-indigo-400" />
                </div>

                <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-100">
                  <CountUp end={item.number} suffix={item.suffix} />
                </h2>

                <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm font-semibold">
                  {item.title}
                </p>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default Stats;