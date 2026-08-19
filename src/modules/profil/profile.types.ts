export interface ProfileDTO {
  id: number;
  bio?: string | null;
  url_localphoto?: string | null;
  photo?: string | null;
  titre?: string | null;
  linkedin?: string | null;
  github?: string | null;
  portfolioUrl?: string | null;
  utilisateurId: number;
}
