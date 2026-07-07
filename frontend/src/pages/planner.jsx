import PlannerForm from "../../components/planner/PlannerForm";

const Planner = () => {
  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">
          ✈️ AI Travel Planner
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Tell us about your trip and let AI create the perfect itinerary.
        </p>

        <PlannerForm />
      </div>
    </div>
  );
};

export default Planner;