import { Request, Response } from "express";
import * as utilisateurService from "./utilisateur.service";
import { utilisateurSchema } from "./utilisateur.schema";
import * as photo from "../../utils/file";

export const createUtilisateurController = async (
  req: Request,
  res: Response
) => {
  try {
    const parsed = utilisateurSchema.parse(req.body);
    const utilisateur = await utilisateurService.createUtilisateur(parsed);

    return res.status(201).json(utilisateur);
  } catch {
    return res.status(400).json({ error: "Données invalides" });
  }
};

export const getUtilisateurByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "Paramètre 'id' invalide",
      });
    }

    const utilisateur = await utilisateurService.getUtilisateurById(id);

    if (!utilisateur) {
      return res.status(404).json({
        error: "Utilisateur non trouvé",
      });
    }

    return res.status(200).json(utilisateur);
  } catch {
    return res.status(500).json({
      error: "Erreur serveur",
    });
  }
};

export const getUtilisateursController = async (
  req: Request,
  res: Response
) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);

    const result = await utilisateurService.getUtilisateurs(page, limit);

    return res.status(200).json(result);
  } catch {
    return res.status(500).json({
      error: "Erreur serveur",
    });
  }
};

export const getUtilisateurWithProfileController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = Number(req.params.id);

    if (!Number.isInteger(userId) || userId <= 0) {
      return res.status(400).json({
        error: "Paramètre 'id' invalide",
      });
    }

    const utilisateur =
      await utilisateurService.getUtilisateurWithProfile(userId);

    if (!utilisateur) {
      return res.status(404).json({
        error: "Utilisateur non trouvé",
      });
    }

    let profile = utilisateur.profile;

    if (profile?.url_localphoto?.trim()) {
      const file = await photo.getFile(profile.url_localphoto);

      profile = {
        ...profile,
        url_localphoto: file?.url ?? null,
      };
    }

    return res.status(200).json({
      ...utilisateur,
      profile: profile ?? null,
    });
  } catch {
    return res.status(500).json({
      error: "Erreur serveur",
    });
  }
};

export const updateUtilisateurController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "Paramètre 'id' invalide",
      });
    }

    const parsed = utilisateurSchema
      .partial()
      .omit({ id: true })
      .parse(req.body);

    const utilisateur = await utilisateurService.updateUtilisateur(
      id,
      parsed
    );

    if (!utilisateur) {
      return res.status(404).json({
        error: "Utilisateur non trouvé",
      });
    }

    return res.status(200).json(utilisateur);
  } catch {
    return res.status(400).json({
      error: "Erreur lors de la mise à jour",
    });
  }
};

export const deleteUtilisateurController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "Paramètre 'id' invalide",
      });
    }

    const utilisateur = await utilisateurService.deleteUtilisateur(id);

    if (!utilisateur) {
      return res.status(404).json({
        error: "Utilisateur non trouvé",
      });
    }

    return res.status(200).json({
      message: "Utilisateur supprimé avec succès",
      utilisateur,
    });
  } catch {
    return res.status(500).json({
      error: "Erreur lors de la suppression",
    });
  }
};