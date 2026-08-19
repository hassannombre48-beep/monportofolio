import * as categorieProjetRepository from "./categorieprojet.repository";
import { CategorieProjetDTO } from "./categorieprojet.types";

export const createCategorieProjet = (data: Omit<CategorieProjetDTO, "id">) =>
  categorieProjetRepository.createCategorieProjet(data);

export const getCategorieProjetById = (id: number) =>
  categorieProjetRepository.getCategorieProjetById(id);

export const updateCategorieProjet = (id: number, data: Partial<CategorieProjetDTO>) =>
  categorieProjetRepository.updateCategorieProjet(id, data);

export const deleteCategorieProjet = (id: number) =>
  categorieProjetRepository.deleteCategorieProjet(id);

export const getCategoriesProjet = (page = 1, limit = 10) =>
  categorieProjetRepository.getCategoriesProjet(page, limit);

export const getProjetsByCategorie = (categorieId: number, page = 1, limit = 10) =>
  categorieProjetRepository.getProjetsByCategorie(categorieId, page, limit);
