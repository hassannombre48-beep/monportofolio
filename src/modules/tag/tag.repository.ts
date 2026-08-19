import { prisma } from "../../config/database";
import { TagDTO } from "./tag.types";
import { getPagination, formatPagination, PaginationResult } from "../../utils/pagination";

export const getTags = async (
  page = 1,
  limit = 10
): Promise<PaginationResult<TagDTO>> => {
  const { skip, take } = getPagination(page, limit);

  const [tags, total] = await Promise.all([
    prisma.tag.findMany({ skip, take }),
    prisma.tag.count()
  ]);

  return formatPagination(tags, total, page, limit);
};

export const createTag = async (data: Omit<TagDTO, "id">): Promise<TagDTO> =>
  prisma.tag.create({ data });

export const getTagById = async (id: number): Promise<TagDTO | null> =>
  prisma.tag.findUnique({ where: { id } });

export const updateTag = async (id: number, data: Partial<TagDTO>): Promise<TagDTO> =>
  prisma.tag.update({ where: { id }, data });

export const deleteTag = async (id: number): Promise<TagDTO> =>
  prisma.tag.delete({ where: { id } });

