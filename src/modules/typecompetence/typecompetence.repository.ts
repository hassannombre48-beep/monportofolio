import { prisma } from "../../config/database";
import { TypeCompetenceDTO } from "./typecompetence.types";
import { getPagination, formatPagination, PaginationResult } from "../../utils/pagination";

export const getTypesCompetence = async (
  page = 1,
  limit = 10
): Promise<PaginationResult<TypeCompetenceDTO>> => {
  const { skip, take } = getPagination(page, limit);

  const [types, total] = await Promise.all([
    prisma.typeCompetence.findMany({ skip, take }),
    prisma.typeCompetence.count()
  ]);

  return formatPagination(types, total, page, limit);
};

export const createTypeCompetence = async (data: Omit<TypeCompetenceDTO, "id">): Promise<TypeCompetenceDTO> => {
  const { competences: _competences, ...prismaData } = data;
  return prisma.typeCompetence.create({ data: prismaData });
};

export const getTypeCompetenceById = async (id: number): Promise<TypeCompetenceDTO | null> =>
  prisma.typeCompetence.findUnique({ where: { id } });

export const updateTypeCompetence = async (id: number, data: Partial<TypeCompetenceDTO>): Promise<TypeCompetenceDTO> => {
  const { competences: _competences, ...prismaData } = data;
  return prisma.typeCompetence.update({ where: { id }, data: prismaData });
};

export const deleteTypeCompetence = async (id: number): Promise<TypeCompetenceDTO> =>
  prisma.typeCompetence.delete({ where: { id } });


export const getTypesCompetenceWithCompetences = async (
  page = 1,
  limit = 10
): Promise<PaginationResult<TypeCompetenceDTO>> => {
  const { skip, take } = getPagination(page, limit);

  const [types, total] = await Promise.all([
    prisma.typeCompetence.findMany({
      skip,
      take,
      include: { competences: true }, // ⚡ inclut les compétences liées
    }),
    prisma.typeCompetence.count(),
  ]);

  return formatPagination(types, total, page, limit);
};

// ✅ Récupérer un type de compétence par son nom avec ses compétences
export const getTypeCompetenceByName = async (nom: string): Promise<TypeCompetenceDTO | null> => {
  return prisma.typeCompetence.findFirst({
    where: { nom },
    include: { competences: true }, // ⚡ inclut les compétences liées
  });
};
