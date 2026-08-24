import { z } from "zod";

const urlSchema = z.string().url();

export const createProfileSchema = z.object({
  bio: z.string().optional(),
  photo: z.string().optional(),
  titre: z.string().optional(),
  linkedin: urlSchema.optional(),
  github: urlSchema.optional(),
  portfolioUrl: urlSchema.optional(),
  utilisateurId: z.number(),
});

export const updateProfileSchema = z
  .object({
    bio: z.string().optional(),
    photo: z.string().optional(),
    titre: z.string().optional(),
    linkedin: urlSchema.optional(),
    github: urlSchema.optional(),
    portfolioUrl: urlSchema.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Au moins un champ doit être modifié",
  });