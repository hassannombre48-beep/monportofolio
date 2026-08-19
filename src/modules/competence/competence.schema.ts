import { z } from "zod";
// ✅ Validation pour la création
export const competenceSchema = z.object({
  id: z.number().optional(),
  nom: z.string().min(2),
  niveau: z.string().nullable().optional(),
  url_localphoto: z.string().url().nullable().optional(),
  url_cloud: z.string().url().nullable().optional(),
  utilisateurId: z.number(),
  typeId: z.number().nullable().optional()
});