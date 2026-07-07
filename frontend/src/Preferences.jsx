import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getPreferences,
  savePreferences,
} from "../../services/preferenceService";

const Preferences = () => {
  const [loading, setLoading] = useState(true);

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
        preferred_destination_type:
          data.preferred_destination_type || "",

        budget_range:
          data.budget_range || "",

        travel_style:
          data.travel_style || "",
      });
    } catch (error) {
      console.log(error);

      toast.error("Failed to load preferences.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await savePreferences(formData);

      toast.success("Preferences saved successfully!");
    } catch (error) {
      console.log(error);

      toast.error("Failed to save preferences.");
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Travel Preferences
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white rounded-2xl p-8 shadow"
      >
        <div>
          <label className="font-semibold">
            Preferred Destination
          </label>

          <input
            name="preferred_destination_type"
            value={formData.preferred_destination_type}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
            placeholder="Beach, Mountains..."
          />
        </div>

        <div>
          <label className="font-semibold">
            Budget Range
          </label>

          <input
            name="budget_range"
            value={formData.budget_range}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
            placeholder="20000-30000"
          />
        </div>

        <div>
          <label className="font-semibold">
            Travel Style
          </label>

          <input
            name="travel_style"
            value={formData.travel_style}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
            placeholder="Adventure"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
        >
          Save Preferences
        </button>
      </form>
    </div>
  );
};

export default Preferences;