import * as projetRepository from "./projet.repository";
import { ProjetDTO } from "./projet.types";
import { PaginationResult } from "../../utils/pagination";

// 🔹 Récupérer les projets avec pagination
export const getProjets = async (
  page = 1,
  limit = 10
): Promise<PaginationResult<ProjetDTO>> => {
  return projetRepository.getProjets(page, limit);
};

// 🔹 Créer un projet
export const createProjet = async (
  data: Omit<ProjetDTO, "id">
): Promise<ProjetDTO> => {
  return projetRepository.createProjet(data);
};

// 🔹 Récupérer un projet par ID
export const getProjetById = async (
  id: number
): Promise<ProjetDTO | null> => {
  return projetRepository.getProjetById(id);
};

// 🔹 Mettre à jour un projet
export const updateProjet = async (
  id: number,
  data: Partial<ProjetDTO>
): Promise<ProjetDTO> => {
  return projetRepository.updateProjet(id, data);
};

// 🔹 Supprimer un projet
export const deleteProjet = async (
  id: number
): Promise<ProjetDTO> => {
  return projetRepository.deleteProjet(id);
};

// 🔹 Récupérer un projet par son titre
export const getProjetsByTitre = async (
  titre: string
): Promise<ProjetDTO[]> => {
  return projetRepository.getProjetsByTitre(titre);
};
