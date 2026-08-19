import { z } from "zod";
export const projetSchema = z.object({
  id: z.number().optional(),
  titre: z.string(),
  description: z.string().nullable().optional(),
  url_git_back: z.string().url().nullable().optional(),
  url_git_front: z.string().url().nullable().optional(),
  url_localphoto: z.string().url().nullable().optional(),
  url_cloud: z.string().url().nullable().optional(),
  utilisateurId: z.number(),
  categorieId: z.number().nullable().optional()
});