import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateMiddleware = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: "Erreur de validation",
      errors: error.errors
    });
  }
};
