import { z } from "zod";

export const AddCarFormSchema = z.object({
  brand: z.string(),
  model: z.string(),
  imageURL: z.string().url(),
  year_of_production: z
    .number()
    .int()
    .min(1990, { message: "Year should be greater or equal to 1990" })
    .max(2024, { message: "Year should be lower or equal than 2024" }),
  cost_per_hour: z.number().int(),
  description: z.string().optional(),
});
