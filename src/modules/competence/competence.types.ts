export interface CompetenceDTO {
  id: number;
  nom: string;
  niveau?: string | null;
  url_localphoto?: string | null;
  url_cloud?: string | null;
  utilisateurId: number;
  typeId?: number | null;
}
