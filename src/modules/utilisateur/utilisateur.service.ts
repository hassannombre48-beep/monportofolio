import * as utilisateurRepository from "./utilisateur.repository";
import { UtilisateurDTO } from "./utilisateur.types";

export const createUtilisateur = (data: Omit<UtilisateurDTO, "id">) =>
  utilisateurRepository.createUtilisateur(data);

export const getUtilisateurById = (id: number) =>
  utilisateurRepository.getUtilisateurById(id);

export const updateUtilisateur = (id: number, data: Partial<UtilisateurDTO>) =>
  utilisateurRepository.updateUtilisateur(id, data);

export const deleteUtilisateur = (id: number) =>
  utilisateurRepository.deleteUtilisateur(id);

export const getUtilisateurs = (page = 1, limit = 10) =>
  utilisateurRepository.getUtilisateurs(page, limit);

export const getUtilisateurWithProfile = (userId: number) =>
  utilisateurRepository.getUtilisateurWithProfile(userId);
