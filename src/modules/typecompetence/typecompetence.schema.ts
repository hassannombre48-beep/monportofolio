import { z } from "zod";
export const typeCompetenceSchema = z.object({
  id: z.number().optional(),
  nom: z.string().min(2)
});