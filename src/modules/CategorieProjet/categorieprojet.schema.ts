import { z } from "zod";
export const categorieProjetSchema = z.object({
  id: z.number().optional(),
  nom: z.string().min(2)
});