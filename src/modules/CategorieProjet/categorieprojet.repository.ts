import { prisma } from "../../config/database";
import { CategorieProjetDTO } from "./categorieprojet.types";
import { ProjetDTO } from "../projet/projet.types";
import { getPagination, formatPagination, PaginationResult } from "../../utils/pagination";

export const createCategorieProjet = async (data: Omit<CategorieProjetDTO, "id">): Promise<CategorieProjetDTO> =>
  prisma.categorieProjet.create({ data });

export const getCategorieProjetById = async (id: number): Promise<CategorieProjetDTO | null> =>
  prisma.categorieProjet.findUnique({ where: { id } });

export const updateCategorieProjet = async (id: number, data: Partial<CategorieProjetDTO>): Promise<CategorieProjetDTO> =>
  prisma.categorieProjet.update({ where: { id }, data });

export const deleteCategorieProjet = async (id: number): Promise<CategorieProjetDTO> =>
  prisma.categorieProjet.delete({ where: { id } });

/* ===================== PROJETS PAR CATÉGORIE AVEC PAGINATION ===================== */
export const getProjetsByCategorie = async (
  categorieId: number,
  page = 1,
  limit = 10
): Promise<PaginationResult<ProjetDTO>> => {
  const { skip, take } = getPagination(page, limit);

  const [projets, total] = await Promise.all([
    prisma.projet.findMany({
      where: { categorieId },
      skip,
      take
    }),
    prisma.projet.count({ where: { categorieId } })
  ]);

  return formatPagination(projets, total, page, limit);
};

export const getCategoriesProjet = async (
  page = 1,
  limit = 10
): Promise<PaginationResult<CategorieProjetDTO>> => {
  const { skip, take } = getPagination(page, limit);

  const [categories, total] = await Promise.all([
    prisma.categorieProjet.findMany({ skip, take }),
    prisma.categorieProjet.count()
  ]);

  return formatPagination(categories, total, page, limit);
};
