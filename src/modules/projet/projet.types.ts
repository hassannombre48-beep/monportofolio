export interface ProjetDTO {
  id: number;
  titre: string;
  description?: string | null;
  url_git_back?: string | null;
  url_git_front?: string | null;
  url_localphoto?: string | null;
  url_cloud?: string | null;
  utilisateurId: number;
  categorieId?: number | null;
}