import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { AppError } from "../shared/errors/AppError";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new AppError("Token manquant", 401);

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);
  if (!decoded) throw new AppError("Token invalide", 401);

  (req as any).user = decoded;
  next();
};
