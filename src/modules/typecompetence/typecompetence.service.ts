import * as typeCompetenceRepository from "./typecompetence.repository";
import { TypeCompetenceDTO } from "./typecompetence.types";

export const createTypeCompetence = (data: Omit<TypeCompetenceDTO, "id">) =>
  typeCompetenceRepository.createTypeCompetence(data);

export const getTypeCompetenceById = (id: number) =>
  typeCompetenceRepository.getTypeCompetenceById(id);

export const updateTypeCompetence = (id: number, data: Partial<TypeCompetenceDTO>) =>
  typeCompetenceRepository.updateTypeCompetence(id, data);

export const deleteTypeCompetence = (id: number) =>
  typeCompetenceRepository.deleteTypeCompetence(id);

export const getTypesCompetence = (page = 1, limit = 10) =>
  typeCompetenceRepository.getTypesCompetence(page, limit);

export const getTypesCompetenceWithCompetences = (page = 1, limit = 10) =>
  typeCompetenceRepository.getTypesCompetenceWithCompetences(page, limit);
export const getTypeCompetenceByName = (nom: string) =>
  typeCompetenceRepository.getTypeCompetenceByName(nom);