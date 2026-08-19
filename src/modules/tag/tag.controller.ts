import { Request, Response } from "express";
import * as tagService from "./tag.service";
import { tagSchema } from "./tag.schema";

export const createTagController = async (req: Request, res: Response) => {
  try {
    const parsed = tagSchema.parse(req.body);
    const tag = await tagService.createTag(parsed);
    res.status(201).json(tag);
  } catch {
    res.status(400).json({ error: "Données invalides" });
  }
};

export const getTagsController = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const result = await tagService.getTags(page, limit);
  res.json(result);
};

// ✅ Modifier un tag
export const updateTagController = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      return res.status(400).json({ error: "Paramètre 'id' manquant" });
    }

    const id = Array.isArray(idParam) ? parseInt(idParam[0], 10) : parseInt(idParam as string, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Paramètre 'id' invalide" });
    }

    // ✅ Validation partielle avec Zod
    const parsed = tagSchema.partial().parse(req.body);

    const tag = await tagService.updateTag(id, parsed);
    res.json(tag);
  } catch (error) {
    res.status(400).json({ error: "Erreur lors de la mise à jour" });
  }
};

// ✅ Supprimer un tag
export const deleteTagController = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      return res.status(400).json({ error: "Paramètre 'id' manquant" });
    }

    const id = Array.isArray(idParam) ? parseInt(idParam[0], 10) : parseInt(idParam as string, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Paramètre 'id' invalide" });
    }

    const tag = await tagService.deleteTag(id);
    res.json({ message: "Tag supprimé avec succès", tag });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression" });
  }
};
