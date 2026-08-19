import * as profileRepository from "./profile.repository";
import { ProfileDTO } from "./profile.types";
import { createProfileSchema } from "./profile.schema";

// ✅ Créer un profil
export const createProfile = async (data: Omit<ProfileDTO, "id">): Promise<ProfileDTO> => {
  const parsedData = createProfileSchema.parse(data);
  return profileRepository.create(parsedData);
};

// ✅ Récupérer un profil
export const getProfileByUserId = async (userId: number): Promise<ProfileDTO | null> => {
  return profileRepository.findByUserId(userId);
};

// ✅ Mettre à jour un profil
export const updateProfile = async (userId: number, data: Partial<ProfileDTO>): Promise<ProfileDTO> => {
  return profileRepository.update(userId, data);
};

// ✅ Supprimer un profil
export const deleteProfile = async (userId: number): Promise<ProfileDTO> => {
  return profileRepository.remove(userId);
};
