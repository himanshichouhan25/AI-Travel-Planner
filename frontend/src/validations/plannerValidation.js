import { z } from "zod";

export const plannerSchema = z.object({
  destination: z.string().min(2, "Destination is required"),

  budget: z.coerce.number().min(1000, "Minimum budget is ₹1000"),

  days: z.coerce.number().min(1, "Minimum 1 day"),

  travel_style: z.string().min(1, "Select a travel style"),
});