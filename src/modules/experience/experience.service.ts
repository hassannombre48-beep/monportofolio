import * as experienceRepository from "./experience.repository";
import { ExperienceDTO } from "./experience.types";
import { PaginationResult } from "../../utils/pagination";

// 🔹 Récupérer les expériences avec pagination
export const getExperiences = async (
  page = 1,
  limit = 10
): Promise<PaginationResult<ExperienceDTO>> => {
  return experienceRepository.getExperiences(page, limit);
};

// 🔹 Créer une expérience
export const createExperience = async (
  data: Omit<ExperienceDTO, "id">
): Promise<ExperienceDTO> => {
  return experienceRepository.createExperience(data);
};

// 🔹 Récupérer une expérience par ID
export const getExperienceById = async (
  id: number
): Promise<ExperienceDTO | null> => {
  return experienceRepository.getExperienceById(id);
};

// 🔹 Mettre à jour une expérience
export const updateExperience = async (
  id: number,
  data: Partial<ExperienceDTO>
): Promise<ExperienceDTO> => {
  return experienceRepository.updateExperience(id, data);
};

// 🔹 Supprimer une expérience
export const deleteExperience = async (
  id: number
): Promise<ExperienceDTO> => {
  return experienceRepository.deleteExperience(id);
};
