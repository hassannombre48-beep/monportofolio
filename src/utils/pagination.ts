/**
 * Utilitaires de pagination
 * --------------------------
 * - Permet de gérer les résultats paginés
 * - Utilisé pour les listes (utilisateurs, cours, etc.)
 */

export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Calcule les paramètres de pagination
 * @param page - Numéro de page (par défaut 1)
 * @param limit - Nombre d'éléments par page (par défaut 10)
 */
export const getPagination = (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return { skip, take: limit };
};

/**
 * Formate la réponse paginée
 * @param data - Données récupérées
 * @param total - Nombre total d'éléments
 * @param page - Page actuelle
 * @param limit - Limite par page
 */
export const formatPagination = <T>(
  data: T[],
  total: number,
  page: number,
  limit: number
): PaginationResult<T> => {
  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};
