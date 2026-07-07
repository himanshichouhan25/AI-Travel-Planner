import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

import { plannerSchema } from "../../validations/plannerValidation";
import { generateTrip } from "../../services/aiService";

const PlannerForm = ({ onPlanGenerated }) => {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const paramDestination = searchParams.get("destination") || "";
  const paramBudget = searchParams.get("budget") || "";
  const paramStyle = searchParams.get("travel_style") || "Solo";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(plannerSchema),
    defaultValues: {
      destination: paramDestination,
      budget: paramBudget,
      days: "",
      travel_style: paramStyle,
    },
  });

  // Automatically pre-fill the form fields when URL params change
  useEffect(() => {
    reset({
      destination: paramDestination,
      budget: paramBudget,
      days: "",
      travel_style: paramStyle,
    });
  }, [paramDestination, paramBudget, paramStyle, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      toast.info("Generating your travel plan... This may take up to 10 seconds.");

      const result = await generateTrip(data);
      console.log(result);

      if (onPlanGenerated) {
        onPlanGenerated(result.data);
      }

      toast.success("Travel plan generated successfully!");
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.detail ||
          err.message ||
          "Failed to generate travel plan."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8 border border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Destination */}
        <div>
          <label className="font-semibold text-slate-700 dark:text-slate-200">Destination</label>
          <input
            {...register("destination")}
            className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 transition"
            placeholder="Goa"
          />
          {errors.destination && (
            <p className="text-red-500 text-sm mt-1">
              {errors.destination.message}
            </p>
          )}
        </div>

        {/* Budget */}
        <div>
          <label className="font-semibold text-slate-700 dark:text-slate-200">Budget (₹)</label>
          <input
            type="number"
            {...register("budget")}
            className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 transition"
            placeholder="25000"
          />
          {errors.budget && (
            <p className="text-red-500 text-sm mt-1">
              {errors.budget.message}
            </p>
          )}
        </div>

        {/* Days */}
        <div>
          <label className="font-semibold text-slate-700 dark:text-slate-200">Days</label>
          <input
            type="number"
            {...register("days")}
            className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 transition"
            placeholder="4"
          />
          {errors.days && (
            <p className="text-red-500 text-sm mt-1">
              {errors.days.message}
            </p>
          )}
        </div>

        {/* Travel Style */}
        <div>
          <label className="font-semibold text-slate-700 dark:text-slate-200">Travel Style</label>
          <select
            {...register("travel_style")}
            className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
          >
            <option value="Solo">Solo</option>
            <option value="Family">Family</option>
            <option value="Friends">Friends</option>
            <option value="Couple">Couple</option>
            <option value="Business">Business</option>
          </select>
          {errors.travel_style && (
            <p className="text-red-500 text-sm mt-1">
              {errors.travel_style.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="md:col-span-2 bg-blue-600 text-white rounded-xl py-4 hover:bg-blue-700 transition font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20"
        >
          {loading ? "Generating Travel Plan..." : "Generate Travel Plan"}
        </button>
      </form>
    </div>
  );
};

export default PlannerForm;