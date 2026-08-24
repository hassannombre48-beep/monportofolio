import { Request, Response } from "express";
import * as profileService from "./profile.service";
import * as photo from "../../utils/file";
import path from "path";

export const createProfileController = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body };

    if (data.photo) {
      const savedFile = await photo.saveFile(
        Buffer.from(data.photo, "base64"),
        `profile_${Date.now()}.png`
      );

      delete data.photo;
      // ✅ stocker uniquement le nom du fichier
      data.url_localphoto = path.basename(savedFile.localUrl);
    }

    const profile = await profileService.createProfile(data);

    // ✅ renvoyer l’URL publique
    let photoUrl: string | null = null;
    if (profile.url_localphoto?.trim()) {
      const file = await photo.getFile(profile.url_localphoto);
      photoUrl = file?.url ?? null;
    }

    return res.status(201).json({ ...profile, url_localphoto: photoUrl });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const getProfileController = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    if (!Number.isInteger(userId) || userId <= 0) {
      return res.status(400).json({ error: "Identifiant utilisateur invalide" });
    }

    const profile = await profileService.getProfileByUserId(userId);
    if (!profile) {
      return res.status(404).json({ error: "Profil non trouvé" });
    }

    let photoUrl: string | null = null;
    if (profile.url_localphoto?.trim()) {
      const file = await photo.getFile(path.basename(profile.url_localphoto));
      photoUrl = file?.url ?? null;
    }

    return res.status(200).json({ ...profile, url_localphoto: photoUrl });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateProfileController = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    if (!Number.isInteger(userId) || userId <= 0) {
      return res.status(400).json({ error: "Identifiant utilisateur invalide" });
    }

    const data = { ...req.body };
    if (data.photo) {
      const savedFile = await photo.saveFile(
        Buffer.from(data.photo, "base64"),
        `profile_${Date.now()}.png`
      );

      delete data.photo;
      data.url_localphoto = path.basename(savedFile.localUrl);
    }

    const profile = await profileService.updateProfile(userId, data);

    let photoUrl: string | null = null;
    if (profile.url_localphoto?.trim()) {
      const file = await photo.getFile(path.basename(profile.url_localphoto));
      photoUrl = file?.url ?? null;
    }

    return res.status(200).json({ ...profile, url_localphoto: photoUrl });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteProfileController = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    if (!Number.isInteger(userId) || userId <= 0) {
      return res.status(400).json({ error: "Identifiant utilisateur invalide" });
    }

    const profile = await profileService.deleteProfile(userId);
    if (!profile) {
      return res.status(404).json({ error: "Profil non trouvé" });
    }

    if (profile.url_localphoto?.trim()) {
      await photo.deleteFile(path.basename(profile.url_localphoto));
    }

    return res.status(200).json({ message: "Profil supprimé", profile });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
