import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Palmtree,
  Mountain,
  Building,
  Trees,
  Landmark,
  Sparkles,
  Wallet,
  Coins,
  Gem,
  User,
  Users,
  Heart,
  Users2,
  Activity,
  Coffee,
  Briefcase,
} from "lucide-react";

import {
  getPreferences,
  savePreferences,
} from "../../services/preferenceService";

import LoadingSpinner from "../../components/common/LoadingSpinner";
import ButtonLoader from "../../components/common/ButtonLoader";

const Preferences = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    preferred_destination_type: "",
    budget_range: "",
    travel_style: "",
  });

  useEffect(() => {
    loadPreference();
  }, []);

  const loadPreference = async () => {
    try {
      const data = await getPreferences();
      setFormData({
        preferred_destination_type: data.preferred_destination_type || "",
        budget_range: data.budget_range || "",
        travel_style: data.travel_style || "",
      });
    } catch (error) {
      if (error.response?.status === 404) {
        // Safe fallback for new users who haven't saved preferences yet
        setFormData({
          preferred_destination_type: "",
          budget_range: "",
          travel_style: "",
        });
      } else {
        console.error(error);
        toast.error("Failed to load preferences.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.preferred_destination_type || !formData.budget_range || !formData.travel_style) {
      toast.warning("Please select an option for all preference categories!");
      return;
    }

    try {
      setSaving(true);
      await savePreferences(formData);
      toast.success("Preferences saved successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save preferences.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading Preferences..." />;
  }

  // Predefined lists with styles/icons
  const destinationTypes = [
    { value: "Beach", label: "Beach Getaway", icon: Palmtree, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30" },
    { value: "Mountains", label: "Mountain Retreat", icon: Mountain, color: "text-sky-500 bg-sky-50 dark:bg-sky-950/20 border-sky-100 dark:border-sky-900/30" },
    { value: "City", label: "Urban Exploration", icon: Building, color: "text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700" },
    { value: "Nature", label: "Nature & Wildlife", icon: Trees, color: "text-green-600 bg-green-50 dark:bg-green-950/20 border-green-100 dark:border-green-900/30" },
    { value: "History", label: "History & Culture", icon: Landmark, color: "text-amber-500 bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30" },
    { value: "Wellness", label: "Wellness & Spa", icon: Sparkles, color: "text-purple-500 bg-purple-50 dark:bg-purple-950/20 border-purple-100 dark:border-purple-900/30" },
  ];

  const budgetRanges = [
    { value: "Budget", label: "Budget (Economy)", icon: Wallet, description: "Backpacker style, saving money first", color: "text-indigo-500 dark:text-indigo-400" },
    { value: "Standard", label: "Standard (Moderate)", icon: Coins, description: "Comfortable hotel and private transit", color: "text-blue-500 dark:text-blue-400" },
    { value: "Luxury", label: "Luxury (Premium)", icon: Gem, description: "5-star hotels, fine dining & experiences", color: "text-rose-500 dark:text-rose-400" },
  ];

  const travelStyles = [
    { value: "Solo", label: "Solo Traveler", icon: User },
    { value: "Family", label: "Family Trip", icon: Users },
    { value: "Couple", label: "Romantic Couple", icon: Heart },
    { value: "Friends", label: "Friends Group", icon: Users2 },
    { value: "Adventure", label: "Adventure / Trekking", icon: Activity },
    { value: "Relaxation", label: "Relaxation / Leisure", icon: Coffee },
    { value: "Business", label: "Business Trip", icon: Briefcase },
  ];

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-slate-800 dark:text-slate-100">Travel Preferences</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Tailor your future AI itineraries by configuring your general preferences.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none transition-colors duration-300">
        
        {/* Preferred Destination */}
        <div className="space-y-3">
          <label className="text-lg font-bold text-slate-800 dark:text-slate-200 block">
            🏖️ What type of destinations do you prefer?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {destinationTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = formData.preferred_destination_type === type.value;
              return (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => handleSelect("preferred_destination_type", type.value)}
                  className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition duration-300 ${
                    isSelected
                      ? "border-blue-500 bg-blue-50/40 dark:bg-blue-950/20 ring-2 ring-blue-500/20 text-blue-600 dark:text-blue-400 font-semibold"
                      : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 hover:border-slate-200 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <div className={`p-2.5 rounded-xl border ${type.color}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <span className="font-semibold block text-sm">{type.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Budget Level */}
        <div className="space-y-3">
          <label className="text-lg font-bold text-slate-800 dark:text-slate-200 block">
            💰 What is your average budget style?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {budgetRanges.map((budget) => {
              const Icon = budget.icon;
              const isSelected = formData.budget_range === budget.value;
              return (
                <button
                  key={budget.value}
                  type="button"
                  onClick={() => handleSelect("budget_range", budget.value)}
                  className={`flex flex-col p-5 rounded-2xl border text-left transition duration-300 ${
                    isSelected
                      ? "border-blue-500 bg-blue-50/40 dark:bg-blue-950/20 ring-2 ring-blue-500/20 text-blue-600 dark:text-blue-400"
                      : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 hover:border-slate-200 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 self-start mb-3">
                    <Icon size={20} className={budget.color} />
                  </div>
                  <span className="font-bold text-base">{budget.label}</span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs mt-1 leading-normal">{budget.description}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Travel Style */}
        <div className="space-y-3">
          <label className="text-lg font-bold text-slate-800 dark:text-slate-200 block">
            🎒 What is your default travel style?
          </label>
          <div className="flex flex-wrap gap-2.5">
            {travelStyles.map((style) => {
              const Icon = style.icon;
              const isSelected = formData.travel_style === style.value;
              return (
                <button
                  key={style.value}
                  type="button"
                  onClick={() => handleSelect("travel_style", style.value)}
                  className={`flex items-center gap-2 px-4.5 py-2.5 rounded-full border text-sm font-semibold transition duration-200 ${
                    isSelected
                      ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-650 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <Icon size={16} />
                  <span>{style.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-2xl transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 flex items-center justify-center min-w-[200px]"
          >
            {saving ? (
              <ButtonLoader text="Saving Preferences..." />
            ) : (
              "Save Preferences"
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default Preferences;