import { prisma } from "../../config/database";
import { ExperienceDTO } from "./experience.types";
import { getPagination, formatPagination, PaginationResult } from "../../utils/pagination";

export const getExperiences = async (
  page = 1,
  limit = 10
): Promise<PaginationResult<ExperienceDTO>> => {
  const { skip, take } = getPagination(page, limit);

  const [experiences, total] = await Promise.all([
    prisma.experience.findMany({ skip, take }),
    prisma.experience.count()
  ]);

  return formatPagination(experiences, total, page, limit);
};

export const createExperience = async (data: Omit<ExperienceDTO, "id">): Promise<ExperienceDTO> =>
  prisma.experience.create({ data });

export const getExperienceById = async (id: number): Promise<ExperienceDTO | null> =>
  prisma.experience.findUnique({ where: { id } });

export const updateExperience = async (id: number, data: Partial<ExperienceDTO>): Promise<ExperienceDTO> =>
  prisma.experience.update({ where: { id }, data });

export const deleteExperience = async (id: number): Promise<ExperienceDTO> =>
  prisma.experience.delete({ where: { id } });
