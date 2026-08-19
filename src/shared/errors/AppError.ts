/**
 * AppError
 * ---------
 * - Permet de lever des erreurs avec un code HTTP
 * - Utilisé dans les services et middlewares
 */

export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
