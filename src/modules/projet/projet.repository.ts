import { prisma } from "../../config/database";
import { ProjetDTO } from "./projet.types";
import { getPagination, formatPagination, PaginationResult } from "../../utils/pagination";

export const getProjets = async (
  page = 1,
  limit = 10
): Promise<PaginationResult<ProjetDTO>> => {
  const { skip, take } = getPagination(page, limit);

  const [projets, total] = await Promise.all([
    prisma.projet.findMany({ skip, take }),
    prisma.projet.count()
  ]);

  return formatPagination(projets, total, page, limit);
};
export const createProjet = async (data: Omit<ProjetDTO, "id">): Promise<ProjetDTO> =>
  prisma.projet.create({ data });

export const getProjetById = async (id: number): Promise<ProjetDTO | null> =>
  prisma.projet.findUnique({ where: { id } });

export const updateProjet = async (id: number, data: Partial<ProjetDTO>): Promise<ProjetDTO> =>
  prisma.projet.update({ where: { id }, data });

export const deleteProjet = async (id: number): Promise<ProjetDTO> =>
  prisma.projet.delete({ where: { id } });
// ✅ Récupérer un projet par son nom
export const getProjetsByTitre = async (titre: string): Promise<ProjetDTO[]> => {
  return prisma.projet.findMany({
    where: { titre },
  });
};
