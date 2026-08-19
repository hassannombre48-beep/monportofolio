import * as competenceRepository from "./competence.repository";
import { CompetenceDTO } from "./competence.types";
import { PaginationResult } from "../../utils/pagination";

// 🔹 Récupérer les compétences avec pagination
export const getCompetences = async (
  page = 1,
  limit = 10
): Promise<PaginationResult<CompetenceDTO>> => {
  return competenceRepository.getCompetences(page, limit);
};

// 🔹 Créer une compétence
export const createCompetence = async (
  data: Omit<CompetenceDTO, "id">
): Promise<CompetenceDTO> => {
  return competenceRepository.createCompetence(data);
};

// 🔹 Récupérer une compétence par ID
export const getCompetenceById = async (
  id: number
): Promise<CompetenceDTO | null> => {
  return competenceRepository.getCompetenceById(id);
};

// 🔹 Mettre à jour une compétence
export const updateCompetence = async (
  id: number,
  data: Partial<CompetenceDTO>
): Promise<CompetenceDTO> => {
  return competenceRepository.updateCompetence(id, data);
};

// 🔹 Supprimer une compétence
export const deleteCompetence = async (
  id: number
): Promise<CompetenceDTO> => {
  return competenceRepository.deleteCompetence(id);
};
