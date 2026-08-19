export interface ExperienceDTO {
  id: number;
  titre: string;
  entreprise?: string | null;
  description?: string | null;
  dateDebut?: Date | null;
  dateFin?: Date | null;
  url_photo?: string | null;
  utilisateurId: number;
}