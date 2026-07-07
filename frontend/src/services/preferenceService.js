import api from "../lib/axios";

// Get user preferences
export const getPreferences = async () => {
  const response = await api.get("/preferences");
  return response.data;
};

// Create or Update preferences
export const savePreferences = async (data) => {
  const response = await api.post("/preferences", data);
  return response.data;
};