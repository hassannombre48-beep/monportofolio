import { prisma } from "../../config/database";
import { getPagination, formatPagination, PaginationResult } from "../../utils/pagination";
import { UtilisateurDTO, UtilisateurWithProfileDTO } from "./utilisateur.types";

// 🔹 Récupérer une liste paginée d’utilisateurs
export const getUtilisateurs = async (
  page = 1,
  limit = 10
): Promise<PaginationResult<UtilisateurDTO>> => {
  const { skip, take } = getPagination(page, limit);

  const [users, total] = await Promise.all([
    prisma.utilisateur.findMany({ skip, take }),
    prisma.utilisateur.count()
  ]);

  return formatPagination(users, total, page, limit);
};

// 🔹 Créer un utilisateur
export const createUtilisateur = async (
  data: Omit<UtilisateurDTO, "id">
): Promise<UtilisateurDTO> => {
  return prisma.utilisateur.create({ data });
};

// 🔹 Récupérer un utilisateur par ID
export const getUtilisateurById = async (
  id: number
): Promise<UtilisateurDTO | null> => {
  return prisma.utilisateur.findUnique({ where: { id } });
};

// 🔹 Mettre à jour un utilisateur
export const updateUtilisateur = async (
  id: number,
  data: Partial<UtilisateurDTO>
): Promise<UtilisateurDTO> => {
  return prisma.utilisateur.update({ where: { id }, data });
};

// 🔹 Supprimer un utilisateur
export const deleteUtilisateur = async (
  id: number
): Promise<UtilisateurDTO> => {
  return prisma.utilisateur.delete({ where: { id } });
};

// 🔹 Récupérer un utilisateur avec son profil
export const getUtilisateurWithProfile = async (
  userId: number
): Promise<UtilisateurWithProfileDTO | null> => {
  return prisma.utilisateur.findUnique({
    where: { id: userId },
    include: { profile: true },
  });
};
