import { Request, Response } from "express";
import * as categorieProjetService from "./categorieprojet.service";
import { categorieProjetSchema } from "./categorieprojet.schema";

export const createCategorieProjetController = async (req: Request, res: Response) => {
  try {
    const parsed = categorieProjetSchema.parse(req.body);
    const categorie = await categorieProjetService.createCategorieProjet(parsed);
    res.status(201).json(categorie);
  } catch {
    res.status(400).json({ error: "Données invalides" });
  }
};

export const getCategoriesProjetController = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const result = await categorieProjetService.getCategoriesProjet(page, limit);
  res.json(result);
};
export const getProjetsByCategorieController = async (req: Request, res: Response) => {
  const categorieId = req.body.id;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const result = await categorieProjetService.getProjetsByCategorie(categorieId, page, limit);

    // 🔹 Gestion des photos
    if (result.data) {
      for (const projet of result.data) {
        
        if (projet.url_localphoto) {
          projet.url_localphoto = `${process.env.APP_URL}${projet.url_localphoto}`;
        }
      }
    }

    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: "Erreur lors de la récupération des projets par catégorie" });
  }
};

// ✅ Modifier une catégorie
export const updateCategorieProjetController = async (req: Request, res: Response) => {
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
    const parsed = categorieProjetSchema.partial().parse(req.body);

    const categorie = await categorieProjetService.updateCategorieProjet(id, parsed);
    res.json(categorie);
  } catch (error) {
    res.status(400).json({ error: "Erreur lors de la mise à jour" });
  }
};

// ✅ Supprimer une catégorie
export const deleteCategorieProjetController = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      return res.status(400).json({ error: "Paramètre 'id' manquant" });
    }

    const id = Array.isArray(idParam) ? parseInt(idParam[0], 10) : parseInt(idParam as string, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Paramètre 'id' invalide" });
    }

    const categorie = await categorieProjetService.deleteCategorieProjet(id);
    res.json({ message: "Catégorie supprimée avec succès", categorie });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression" });
  }
};