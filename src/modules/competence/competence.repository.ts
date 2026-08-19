import { prisma } from "../../config/database";
import { CompetenceDTO } from "./competence.types";
import { getPagination, formatPagination, PaginationResult } from "../../utils/pagination";

export const getCompetences = async (
  page = 1,
  limit = 10
): Promise<PaginationResult<CompetenceDTO>> => {
  const { skip, take } = getPagination(page, limit);

  const [competences, total] = await Promise.all([
    prisma.competence.findMany({ skip, take }),
    prisma.competence.count()
  ]);

  return formatPagination(competences, total, page, limit);
};
export const createCompetence = async (data: Omit<CompetenceDTO, "id">): Promise<CompetenceDTO> =>
  prisma.competence.create({ data });

export const getCompetenceById = async (id: number): Promise<CompetenceDTO | null> =>
  prisma.competence.findUnique({ where: { id } });

export const updateCompetence = async (id: number, data: Partial<CompetenceDTO>): Promise<CompetenceDTO> =>
  prisma.competence.update({ where: { id }, data });

export const deleteCompetence = async (id: number): Promise<CompetenceDTO> =>
  prisma.competence.delete({ where: { id } });
