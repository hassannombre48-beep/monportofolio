import { z } from "zod";
export const tagSchema = z.object({
  id: z.number().optional(),
  nom: z.string().min(2)
});
export type TagInput = z.infer<typeof tagSchema>;