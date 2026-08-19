import { Request, Response } from "express";
import * as projetService from "./projet.service";
import { projetSchema } from "./projet.schema";
import * as photo from "../../utils/file";

// 🔹 Créer un projet
export const createProjetController = async (req: Request, res: Response) => {
  try {
    const parsed = projetSchema.parse(req.body);

    if (req.body.photo) {
      const file = await photo.saveFile(
        Buffer.from(req.body.photo, "base64"),
        req.body.photoName || `projet_${Date.now()}.png`
      );
      parsed.url_localphoto = file.localUrl; // ✅ gestion photo
    }

    const projet = await projetService.createProjet(parsed);
    res.status(201).json(projet);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Données invalides" });
  }
};

// 🔹 Récupérer tous les projets (pagination)
export const getProjetsController = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await projetService.getProjets(page, limit);

    if (result.data) {
      for (const proj of result.data) {
        if (proj.url_localphoto) {
          proj.url_localphoto = `${process.env.APP_URL}${proj.url_localphoto}`;
        }
      }
    }

    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: "Erreur lors de la récupération des projets" });
  }
};

// 🔹 Récupérer un projet par ID
export const getProjetByIdController = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!idParam) return res.status(400).json({ error: "Paramètre 'id' manquant" });

    const id = Array.isArray(idParam) ? parseInt(idParam[0], 10) : parseInt(idParam, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Paramètre 'id' invalide" });

    const projet = await projetService.getProjetById(id);
    if (!projet) return res.status(404).json({ error: "Projet non trouvé" });

    if (projet.url_localphoto) {
      projet.url_localphoto = `${process.env.APP_URL}${projet.url_localphoto          }`;
    }

    res.json(projet);
  } catch (error: any) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// 🔹 Mettre à jour un projet
export const updateProjetController = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!idParam) return res.status(400).json({ error: "Paramètre 'id' manquant" });

    const id = Array.isArray(idParam) ? parseInt(idParam[0], 10) : parseInt(idParam, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Paramètre 'id' invalide" });

    const parsed = projetSchema.partial().parse(req.body);

    if (req.body.photo) {
      const file = await photo.saveFile(
        Buffer.from(req.body.photo, "base64"),
        req.body.photoName || `projet_${Date.now()}.png`
      );
      parsed.url_localphoto = file.localUrl;
    }

    const projet = await projetService.updateProjet(id, parsed);
    res.json(projet);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Erreur lors de la mise à jour" });
  }
};

// 🔹 Supprimer un projet
export const deleteProjetController = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!idParam) return res.status(400).json({ error: "Paramètre 'id' manquant" });

    const id = Array.isArray(idParam) ? parseInt(idParam[0], 10) : parseInt(idParam, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Paramètre 'id' invalide" });

    const projet = await projetService.deleteProjet(id);

    if (projet?.url_localphoto) {
      await photo.deleteFile(projet.url_localphoto);
    }

    res.json({ message: "Projet supprimé avec succès", projet });
  } catch (error: any) {
    res.status(500).json({ error: "Erreur lors de la suppression" });
  }
};

// 🔹 Récupérer un projet par son titre
export const getProjetsByTitreController = async (req: Request, res: Response) => {
  try {
    const titreParam = req.params.titre;
    if (!titreParam) return res.status(400).json({ error: "Paramètre 'titre' manquant" });

    const titre = Array.isArray(titreParam) ? titreParam[0] : titreParam;
    const projets = await projetService.getProjetsByTitre(titre);

    if (!projets || projets.length === 0) {
      return res.status(404).json({ error: "Projet non trouvé" });
    }

    for (const proj of projets) {
      if (proj.url_localphoto) {
        proj.url_localphoto = `${process.env.APP_URL}${proj.url_localphoto}`;
      }
    }

    res.json(projets);
  } catch (error: any) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
