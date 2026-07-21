import { useState } from "react";
import PlannerForm from "../../components/planner/PlannerForm";
import TripSummary from "../../components/planner/TripSummary";
import DayCard from "../../components/planner/DayCard";
import BudgetCard from "../../components/planner/BudgetCard";
import TipsCard from "../../components/planner/TipsCard";
import WeatherCard from "../../components/planner/WeatherCard";

const Planner = () => {
  const [tripData, setTripData] = useState(null);

  return (
    <>
      {/* Page Heading */}
      <div className="text-center mb-10 animate-fade-in">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center gap-2">
          ✈️ AI Travel Planner
        </h1>

        <p className="text-slate-605 dark:text-slate-400 mt-3 max-w-lg mx-auto text-sm leading-relaxed">
          Tell us about your trip details, and let our AI craft a personalized, real-time itinerary for you!
        </p>
      </div>

      {/* Planner Form */}
      <PlannerForm onPlanGenerated={setTripData} />

      {/* Render the details only when tripData is successfully generated */}
      {tripData && tripData.structured_plan && (
        <div className="mt-12 space-y-8 animate-fade-in">
          <div className="border-t border-slate-100 dark:border-slate-800 pt-8">
            <h2 className="text-3xl font-extrabold text-slate-855 dark:text-slate-100 text-center mb-2">
              Your Personalized Itinerary
            </h2>
            <p className="text-center text-slate-500 dark:text-slate-400 mb-8 text-sm">
              Based on real-time weather, accommodations, attractions, and your style preferences.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TripSummary
              summary={tripData.structured_plan.overview}
              hotels={tripData.structured_plan.hotels}
            />
            <WeatherCard
              weatherSummary={tripData.structured_plan.weather_summary}
              packingList={tripData.structured_plan.packing_list}
            />
            <BudgetCard
              budget={tripData.budget}
              travelStyle={tripData.travel_style}
              tips={tripData.structured_plan.budget_tips}
            />
            <TipsCard
              tips={tripData.structured_plan.travel_safety_tips}
            />
          </div>

          {/* Day Cards */}
          <div className="space-y-6 pt-4">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              🗓️ Day-by-Day Itinerary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tripData.structured_plan.itinerary.map((dayData, idx) => (
                <DayCard key={idx} dayData={dayData} />
              ))}
            </div>
          </div>
        </div>
      )}

      {!tripData && (
        <div className="mt-12 text-center text-slate-400 dark:text-slate-500 py-16 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50/50 dark:bg-slate-900/10 transition-colors duration-300">
          <p className="text-lg font-medium text-slate-700 dark:text-slate-300">No Travel Plan Generated Yet</p>
          <p className="text-sm mt-1 max-w-sm mx-auto leading-relaxed text-slate-500 dark:text-slate-400">
            Fill in the destination, budget, and days above to generate a full visual travel itinerary.
          </p>
        </div>
      )}
    </>
  );
};

export default Planner;