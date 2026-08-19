/**
 * Interface ApiResponse
 * ----------------------
 * - Définit la structure standard des réponses API
 */

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  statusCode?: number;
}
