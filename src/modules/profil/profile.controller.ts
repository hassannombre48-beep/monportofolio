import { Request, Response } from "express";
import * as profileService from "./profile.service";
import * as photo from "../../utils/file";

// ✅ Créer un profil
export const createProfileController = async (req: Request, res: Response) => {
  try {
    // Sauvegarde de la photo si présente
    let url;
    if (req.body.photo) {
      url = await photo.saveFile(
        Buffer.from(req.body.photo, "base64"),
        `profile_${Date.now()}.png`
      );
      delete req.body.photo; // on supprime la donnée brute
    }

    const profile = await profileService.createProfile({
      ...req.body,
      url_localphoto: url,
    });

    res.status(201).json(profile);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Récupérer un profil
export const getProfileController = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const profile = await profileService.getProfileByUserId(userId);

    if (!profile) {
      return res.status(404).json({ error: "Profil non trouvé" });
    }

    const url = await photo.getFile(profile.url_localphoto || "");
    res.json({ ...profile, url_localphoto: url });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Mettre à jour un profil
export const updateProfileController = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    if (req.body.photo) {
      const url = await photo.saveFile(
        Buffer.from(req.body.photo, "base64"),
        `profile_${Date.now()}.png`
      );
      delete req.body.photo;
      req.body.url_localphoto = url;
    }

    const profile = await profileService.updateProfile(userId, req.body);
    res.json(profile);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Supprimer un profil
export const deleteProfileController = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const profile = await profileService.deleteProfile(userId);

    if (profile?.url_localphoto) {
      await photo.deleteFile(profile.url_localphoto);
    }

    res.json({ message: "Profil supprimé", profile });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
