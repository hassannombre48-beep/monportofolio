import { Request, Response } from "express";
import * as competenceService from "./competence.service";
import { competenceSchema } from "./competence.schema";
import * as photo from "../../utils/file";

// 🔹 Créer une compétence
export const createCompetenceController = async (req: Request, res: Response) => {
  try {
    const parsed = competenceSchema.parse(req.body);

    if (req.body.photo) {
      const file = await photo.saveFile(
        Buffer.from(req.body.photo, "base64"),
        req.body.photoName || `competence_${Date.now()}.png`
      );
      parsed.url_localphoto = file.localUrl; // ✅ correction
    }

    const competence = await competenceService.createCompetence(parsed);
    res.status(201).json(competence);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Données invalides" });
  }
};

// 🔹 Récupérer les compétences (pagination)
export const getCompetencesController = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await competenceService.getCompetences(page, limit);

    if (result.data) {
      for (const competence of result.data) {
        if (competence.url_localphoto) {
          competence.url_localphoto = `${process.env.APP_URL}${competence.url_localphoto}`;
        }
      }
    }

    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: "Erreur lors de la récupération des compétences" });
  }
};

// 🔹 Mettre à jour une compétence
export const updateCompetenceController = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!idParam) return res.status(400).json({ error: "Paramètre 'id' manquant" });

    const id = Array.isArray(idParam) ? parseInt(idParam[0], 10) : parseInt(idParam, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Paramètre 'id' invalide" });

    const parsed = competenceSchema.partial().parse(req.body);

    if (req.body.photo) {
      const file = await photo.saveFile(
        Buffer.from(req.body.photo, "base64"),
        req.body.photoName || `competence_${Date.now()}.png`
      );
      parsed.url_localphoto = file.localUrl; // ✅ correction
    }

    const competence = await competenceService.updateCompetence(id, parsed);
    res.json(competence);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Erreur lors de la mise à jour" });
  }
};

// 🔹 Supprimer une compétence
export const deleteCompetenceController = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!idParam) return res.status(400).json({ error: "Paramètre 'id' manquant" });

    const id = Array.isArray(idParam) ? parseInt(idParam[0], 10) : parseInt(idParam, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Paramètre 'id' invalide" });

    const competence = await competenceService.deleteCompetence(id);

    if (competence?.url_localphoto) {
      await photo.deleteFile(competence.url_localphoto);
    }

    res.json({ message: "Compétence supprimée avec succès", competence });
  } catch (error: any) {
    res.status(500).json({ error: "Erreur lors de la suppression" });
  }
};
