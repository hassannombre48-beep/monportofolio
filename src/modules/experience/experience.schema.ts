import { z } from "zod";
/* ===================== EXPERIENCE ===================== */
export const experienceSchema = z.object({
  id: z.number().optional(),
  titre: z.string(),
  entreprise: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  dateDebut: z.date().nullable().optional(),
  dateFin: z.date().nullable().optional(),
  url_photo: z.string().url().nullable().optional(),
  utilisateurId: z.number()
});