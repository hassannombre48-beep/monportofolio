// src/modules/utilisateur/utilisateur.schema.ts
import { z } from "zod";

export const utilisateurSchema = z.object({
  id: z.number().optional(),
  nom: z.string().min(2),
  prenom: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

