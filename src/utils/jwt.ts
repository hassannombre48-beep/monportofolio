import jwt, { SignOptions } from "jsonwebtoken";
import { ENV } from "../config/env";

export const generateToken = (
  payload: object,
  expiresIn: SignOptions["expiresIn"] = "1h"
) => {
  return jwt.sign(payload, ENV.JWT_SECRET as string, { expiresIn });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, ENV.JWT_SECRET as string);
  } catch {
    return null;
  }
};