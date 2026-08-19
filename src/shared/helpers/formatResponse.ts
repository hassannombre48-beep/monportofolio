import { ApiResponse } from "../interfaces/api-response.interface";

/**
 * Réponse de succès
 */
export const successResponse = <T>(data: T, message = "Succès"): ApiResponse<T> => {
  return {
    success: true,
    message,
    data,
    statusCode: 200
  };
};

/**
 * Réponse d'erreur
 */
export const errorResponse = (message = "Erreur", statusCode = 500): ApiResponse<null> => {
  return {
    success: false,
    message,
    statusCode
  };
};
