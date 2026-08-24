import { prisma } from "../../config/database";
import { ProfileDTO } from "./profile.types";

export const create = async (data: Omit<ProfileDTO, "id">): Promise<ProfileDTO> => {
  return prisma.profile.create({ data });
};

export const findByUserId = async (userId: number): Promise<ProfileDTO | null> => {
  return prisma.profile.findUnique({
    where: { utilisateurId: userId }
  });
};

export const update = async (userId: number, data: Partial<ProfileDTO>): Promise<ProfileDTO> => {
  const profileData = Object.fromEntries(Object.entries({
    bio: data.bio,
    url_localphoto: data.url_localphoto,
    photo: data.photo,
    titre: data.titre,
    linkedin: data.linkedin,
    github: data.github,
    portfolioUrl: data.portfolioUrl
  }).filter(([, value]) => value !== undefined));

  return prisma.profile.update({
    where: { utilisateurId: userId },
    data: profileData
  });
};

export const remove = async (userId: number): Promise<ProfileDTO> => {
  return prisma.profile.delete({
    where: { utilisateurId: userId }
  });
};
