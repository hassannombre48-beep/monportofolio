import fs from "fs";
import path from "path";

/**
 * Charge une image depuis le disque et la convertit en base64
 * @param urlLocalPhoto - URL locale (ex: /uploads/image.png)
 * @returns Base64 de l'image ou null si fichier inexistant
 */
export const loadImageAsBase64 = async (urlLocalPhoto: string | null | undefined): Promise<string | null> => {
  if (!urlLocalPhoto) return null;

  try {
    // Extraire le nom du fichier depuis l'URL
    // /uploads/image.png -> image.png
    const fileName = urlLocalPhoto.split("/").pop();
    if (!fileName) return null;

    const filePath = path.join(__dirname, "../../uploads", fileName);

    // Vérifier si le fichier existe
    if (!fs.existsSync(filePath)) {
      console.warn(`Fichier image non trouvé: ${filePath}`);
      return null;
    }

    // Lire le fichier et convertir en base64
    const fileBuffer = fs.readFileSync(filePath);
    return fileBuffer.toString("base64");
  } catch (error) {
    console.error("Erreur lors du chargement de l'image:", error);
    return null;
  }
};

/**
 * Ajoute l'image en base64 à un objet de données
 */
export const addImageToData = async <T extends { url_localphoto?: string | null }>(
  data: T
): Promise<T & { imageBase64?: string | null }> => {
  if (!data.url_localphoto) {
    return { ...data, imageBase64: null };
  }

  const imageBase64 = await loadImageAsBase64(data.url_localphoto);
  return { ...data, imageBase64 };
};

/**
 * Ajoute les images en base64 à un array de données
 */
export const addImagesToDataArray = async <T extends { url_localphoto?: string | null }>(
  dataArray: T[]
): Promise<(T & { imageBase64?: string | null })[]> => {
  return Promise.all(dataArray.map(item => addImageToData(item)));
};

/**
 * Pour les expériences qui utilisent url_photo au lieu de url_localphoto
 */
export const loadImageAsBase64ForPhoto = async (urlPhoto: string | null | undefined): Promise<string | null> => {
  if (!urlPhoto) return null;

  try {
    const fileName = urlPhoto.split("/").pop();
    if (!fileName) return null;

    const filePath = path.join(__dirname, "../../uploads", fileName);

    if (!fs.existsSync(filePath)) {
      console.warn(`Fichier image non trouvé: ${filePath}`);
      return null;
    }

    const fileBuffer = fs.readFileSync(filePath);
    return fileBuffer.toString("base64");
  } catch (error) {
    console.error("Erreur lors du chargement de l'image:", error);
    return null;
  }
};

/**
 * Ajoute l'image en base64 à un objet avec url_photo (expériences)
 */
export const addImageToDataWithPhoto = async <T extends { url_photo?: string | null }>(
  data: T
): Promise<T & { imageBase64?: string | null }> => {
  if (!data.url_photo) {
    return { ...data, imageBase64: null };
  }

  const imageBase64 = await loadImageAsBase64ForPhoto(data.url_photo);
  return { ...data, imageBase64 };
};

/**
 * Ajoute les images en base64 à un array de données (expériences)
 */
export const addImagesToDataArrayWithPhoto = async <T extends { url_photo?: string | null }>(
  dataArray: T[]
): Promise<(T & { imageBase64?: string | null })[]> => {
  return Promise.all(dataArray.map(item => addImageToDataWithPhoto(item)));
};
