import api from "../lib/axios";

export const generateTrip = async (tripData) => {
  try {
    const response = await api.post("/ai/plan-trip", tripData);
    return response.data;
  } catch (error) {
    console.error("AI Planner Error:", error);

    if (error.response) {
      throw new Error(
        error.response.data.detail || "AI Planner failed."
      );
    }

    throw new Error("Network error. Please check your connection.");
  }
};