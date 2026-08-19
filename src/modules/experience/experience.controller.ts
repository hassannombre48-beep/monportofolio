import { Request, Response } from "express";
import * as experienceService from "./experience.service";
import { experienceSchema } from "./experience.schema";
import * as photo from "../../utils/file";

// 🔹 Créer une expérience
export const createExperienceController = async (req: Request, res: Response) => {
  try {
    const parsed = experienceSchema.parse(req.body);

    if (req.body.photo) {
      const file = await photo.saveFile(
        Buffer.from(req.body.photo, "base64"),
        req.body.photoName || `experience_${Date.now()}.png`
      );
      parsed.url_photo = file.localUrl; // ✅ correction : url_photo
    }

    const experience = await experienceService.createExperience(parsed);
    res.status(201).json(experience);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Données invalides" });
  }
};

// 🔹 Récupérer toutes les expériences (pagination)
export const getExperiencesController = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await experienceService.getExperiences(page, limit);

    if (result.data) {
      for (const exp of result.data) {
        if (exp.url_photo) {
          exp.url_photo = `${process.env.APP_URL}${exp.url_photo}`;
        }
      }
    }

    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: "Erreur lors de la récupération des expériences" });
  }
};

// 🔹 Récupérer une expérience par ID
export const getExperienceByIdController = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!idParam) return res.status(400).json({ error: "Paramètre 'id' manquant" });

    const id = Array.isArray(idParam) ? parseInt(idParam[0], 10) : parseInt(idParam, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Paramètre 'id' invalide" });

    const experience = await experienceService.getExperienceById(id);
    if (!experience) return res.status(404).json({ error: "Expérience non trouvée" });

    if (experience.url_photo) {
      experience.url_photo = `${process.env.APP_URL}${experience.url_photo}`;
    }

    res.json(experience);
  } catch (error: any) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// 🔹 Mettre à jour une expérience
export const updateExperienceController = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!idParam) return res.status(400).json({ error: "Paramètre 'id' manquant" });

    const id = Array.isArray(idParam) ? parseInt(idParam[0], 10) : parseInt(idParam, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Paramètre 'id' invalide" });

    const parsed = experienceSchema.partial().parse(req.body);

    if (req.body.photo) {
      const file = await photo.saveFile(
        Buffer.from(req.body.photo, "base64"),
        req.body.photoName || `experience_${Date.now()}.png`
      );
      parsed.url_photo = file.localUrl; // ✅ correction
    }

    const experience = await experienceService.updateExperience(id, parsed);
    res.json(experience);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Erreur lors de la mise à jour" });
  }
};

// 🔹 Supprimer une expérience
export const deleteExperienceController = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!idParam) return res.status(400).json({ error: "Paramètre 'id' manquant" });

    const id = Array.isArray(idParam) ? parseInt(idParam[0], 10) : parseInt(idParam, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Paramètre 'id' invalide" });

    const experience = await experienceService.deleteExperience(id);

    if (experience?.url_photo) {
      await photo.deleteFile(experience.url_photo);
    }

    res.json({ message: "Expérience supprimée avec succès", experience });
  } catch (error: any) {
    res.status(500).json({ error: "Erreur lors de la suppression" });
  }
};
