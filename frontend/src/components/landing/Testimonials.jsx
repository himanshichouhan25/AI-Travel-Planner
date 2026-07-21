import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Travel Blogger",
    review:
      "AI Travel Planner saved me hours of planning. The itinerary was accurate and perfectly matched my budget.",
  },
  {
    name: "Priya Mehta",
    role: "Software Engineer",
    review:
      "The weather, hotels and nearby attractions were all suggested automatically. Amazing experience!",
  },
  {
    name: "Amit Verma",
    role: "Photographer",
    review:
      "One of the best AI travel planning tools I've used. Clean UI and very helpful recommendations.",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-100">
            What Travelers Say
          </h2>

          <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm font-semibold">
            Loved by thousands of travelers around the world.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-8 border border-slate-100 dark:border-slate-800/80 hover:-translate-y-2 transition"
            >
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[1,2,3,4,5].map((star)=>(
                  <Star key={star} size={18} fill="currentColor"/>
                ))}
              </div>

              <p className="text-slate-600 dark:text-slate-300 mb-6 italic leading-relaxed text-sm">
                "{item.review}"
              </p>

              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100">
                  {item.name}
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  {item.role}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Testimonials;