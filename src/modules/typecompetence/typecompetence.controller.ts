import { Request, Response } from "express";
import * as typeCompetenceService from "./typecompetence.service";
import { typeCompetenceSchema } from "./typecompetence.schema";
import * as photo from "../../utils/file"; 
export const createTypeCompetenceController = async (req: Request, res: Response) => {
  try {
    const parsed = typeCompetenceSchema.parse(req.body);
    const type = await typeCompetenceService.createTypeCompetence(parsed);
    res.status(201).json(type);
  } catch {
    res.status(400).json({ error: "Données invalides" });
  }
};

export const getTypesCompetenceController = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const result = await typeCompetenceService.getTypesCompetence(page, limit);
  res.json(result);
};


export const getTypesCompetenceWithCompetencesController = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const result = await typeCompetenceService.getTypesCompetenceWithCompetences(page, limit);

    if (result.data) {
      for (const type of result.data) {
        if (type.competences) {
          for (const comp of type.competences) {
            if (comp.url_localphoto) {
              comp.url_localphoto = `${process.env.APP_URL}${comp.url_localphoto}`;
            }
            if (comp.url_localphoto) {
              comp.url_localphoto = `${process.env.APP_URL}${comp.url_localphoto}`;
            }
          }
        }
      }
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des types de compétences" });
  }
};




// ✅ Modifier un type de compétence
export const updateTypeCompetenceController = async (req: Request, res: Response) => {
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
    const parsed = typeCompetenceSchema.partial().parse(req.body);

    const typeCompetence = await typeCompetenceService.updateTypeCompetence(id, parsed);
    res.json(typeCompetence);
  } catch (error) {
    res.status(400).json({ error: "Erreur lors de la mise à jour" });
  }
};

// ✅ Supprimer un type de compétence
export const deleteTypeCompetenceController = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      return res.status(400).json({ error: "Paramètre 'id' manquant" });
    }

    const id = Array.isArray(idParam) ? parseInt(idParam[0], 10) : parseInt(idParam as string, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Paramètre 'id' invalide" });
    }

    const typeCompetence = await typeCompetenceService.deleteTypeCompetence(id);
    res.json({ message: "Type de compétence supprimé avec succès", typeCompetence });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression" });
  }
};


// ✅ Récupérer un type de compétence par son nom
export const getTypeCompetenceByNameController = async (req: Request, res: Response) => {
  try {
    const nomParam = req.params.nom;
    if (!nomParam) {
      return res.status(400).json({ error: "Paramètre 'nom' manquant" });
    }

    const nom = Array.isArray(nomParam) ? nomParam[0] : (nomParam as string);

    const typeCompetence = await typeCompetenceService.getTypeCompetenceByName(nom);
    if (!typeCompetence) {
      return res.status(404).json({ error: "Type de compétence non trouvé" });
    }

    res.json(typeCompetence);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
