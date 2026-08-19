import { z } from "zod";
// ✅ Schéma de création de profil
export const createProfileSchema = z.object({
  bio: z.string().optional(),
  url_localphoto: z.string().url().optional(),
  photo: z.string().optional(),
  titre: z.string().optional(),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
  portfolioUrl: z.string().url().optional(),
  utilisateurId: z.number() // obligatoire pour relier au User
});