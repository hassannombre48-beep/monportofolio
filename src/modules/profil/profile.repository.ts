import { prisma } from "../../config/database";
import { ProfileDTO } from "./profile.types";

export const create = async (data: Omit<ProfileDTO, "id">): Promise<ProfileDTO> => {
  return prisma.profile.create({ data });
};

export const findByUserId = async (userId: number): Promise<ProfileDTO | null> => {
  return prisma.profile.findUnique({
    where: { utilisateurId: userId },
    include: { utilisateur: true }
  });
};

export const update = async (userId: number, data: Partial<ProfileDTO>): Promise<ProfileDTO> => {
  return prisma.profile.update({
    where: { utilisateurId: userId },
    data
  });
};

export const remove = async (userId: number): Promise<ProfileDTO> => {
  return prisma.profile.delete({
    where: { utilisateurId: userId }
  });
};
