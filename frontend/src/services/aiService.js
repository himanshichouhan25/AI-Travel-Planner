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

export const sendChatMessage = async (message, conversationHistory = []) => {
  try {
    const response = await api.post("/ai/chat", {
      message,
      conversation_history: conversationHistory,
    });
    return response.data;
  } catch (error) {
    console.error("AI Chat Error:", error);

    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }

    throw new Error("Sorry, I couldn't process that request right now. Please try again.");
  }
};