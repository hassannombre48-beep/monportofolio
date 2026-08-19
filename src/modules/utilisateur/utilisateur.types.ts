import { ProfileDTO } from "../profil/profile.types";

// 🔹 Type de base : Utilisateur sans relation
export interface UtilisateurDTO {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  // autres champs éventuels...
}

// 🔹 Type enrichi : Utilisateur avec son profil
export interface UtilisateurWithProfileDTO extends UtilisateurDTO {
  profile?: ProfileDTO | null;
}
