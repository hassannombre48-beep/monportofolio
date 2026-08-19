/**
 * Utilitaires de hashage
 * -----------------------
 * - Hashage sécurisé des mots de passe avec bcrypt
 * - Comparaison des mots de passe pour l'authentification
 */

import bcrypt from "bcrypt";

/**
 * Hash un mot de passe
 * @param password - Mot de passe en clair
 */
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10); // Génère un sel
  return bcrypt.hash(password, salt);
};

/**
 * Compare un mot de passe avec son hash
 * @param password - Mot de passe en clair
 * @param hash - Hash stocké en base
 */
export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
