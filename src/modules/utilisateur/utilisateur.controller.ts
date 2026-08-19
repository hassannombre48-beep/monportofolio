import { Request, Response } from "express";
import * as utilisateurService from "./utilisateur.service";
import { utilisateurSchema } from "./utilisateur.schema";
import * as  photo from "../../utils/file";
export const createUtilisateurController = async (req: Request, res: Response) => {
  try {
    const parsed = utilisateurSchema.parse(req.body);
    const utilisateur = await utilisateurService.createUtilisateur(parsed);
    res.status(201).json(utilisateur);
  } catch (error) {
    res.status(400).json({ error: "Données invalides" });
  }
};
export const getUtilisateurByIdController = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      return res.status(400).json({ error: "Paramètre 'id' manquant" });
    }

    const id = Array.isArray(idParam) ? parseInt(idParam[0], 10) : parseInt(idParam as string, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Paramètre 'id' invalide" });
    }

    const utilisateur = await utilisateurService.getUtilisateurById(id);
    if (!utilisateur) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.json(utilisateur);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const getUtilisateursController = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const result = await utilisateurService.getUtilisateurs(page, limit);
  res.json(result);
};


export const getUtilisateurWithProfileController = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      return res.status(400).json({ error: "Paramètre 'id' manquant" });
    }

    const userId = Array.isArray(idParam) ? parseInt(idParam[0], 10) : parseInt(idParam as string, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Paramètre 'id' invalide" });
    }

    const utilisateur = await utilisateurService.getUtilisateurWithProfile(userId);
    if (!utilisateur) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    const url = await photo.getFile(utilisateur.profile?.url_localphoto || "");
    res.json({
      ...utilisateur,
      profile: utilisateur.profile ? { ...utilisateur.profile, url_localphoto: url } : null
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const updateUtilisateurController = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      return res.status(400).json({ error: "Paramètre 'id' manquant" });
    }

    const id = Array.isArray(idParam) ? parseInt(idParam[0], 10) : parseInt(idParam as string, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Paramètre 'id' invalide" });
    }

    // ✅ Validation partielle avec Zod (merge)
    const parsed = utilisateurSchema.partial().parse(req.body);

    const utilisateur = await utilisateurService.updateUtilisateur(id, parsed);
    res.json(utilisateur);
  } catch (error) {
    res.status(400).json({ error: "Erreur lors de la mise à jour" });
  }
};


export const deleteUtilisateurController = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      return res.status(400).json({ error: "Paramètre 'id' manquant" });
    }

    const id = Array.isArray(idParam) ? parseInt(idParam[0], 10) : parseInt(idParam as string, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Paramètre 'id' invalide" });
    }

    const utilisateur = await utilisateurService.deleteUtilisateur(id);
    res.json({ message: "Utilisateur supprimé avec succès", utilisateur });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression" });
  }
};
