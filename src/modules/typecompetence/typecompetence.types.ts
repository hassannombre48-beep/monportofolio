export interface TypeCompetenceDTO {
  id: number;
  nom: string;
}

// typecompetence.types.ts
import { CompetenceDTO } from "../competence/competence.types";

export interface TypeCompetenceDTO {
  id: number;
  nom: string;
  // autres champs éventuels...
  competences?: CompetenceDTO[]; // ✅ ajout de la relation
}
