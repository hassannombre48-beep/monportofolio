import { RegisterInput, LoginInput, UserDTO, TokenPayload } from "./auth.types";
import * as authRepository from "./auth.repository";
import { hashPassword, comparePassword } from "../../utils/hash";
import { generateToken, verifyToken } from "../../utils/jwt";
import { AppError } from "../../shared/errors/AppError";

export const register = async (data: RegisterInput): Promise<UserDTO> => {
  const existingUser = await authRepository.findUserByEmail(data.email);
  if (existingUser) throw new AppError("Email déjà utilisé", 400);

  const hashedPassword = await hashPassword(data.password);
  return authRepository.createUser({ ...data, password: hashedPassword });
};

export const login = async (data: LoginInput) => {
  const user = await authRepository.findUserByEmail(data.email);
  if (!user) throw new AppError("Utilisateur non trouvé", 404);

  const isValid = await comparePassword(data.password, user.password);
  if (!isValid) throw new AppError("Mot de passe incorrect", 401);

  const accessToken = generateToken({ userId: user.id }, "15m");
  const refreshToken = generateToken({ userId: user.id }, "7d");

  const { password, ...safeUser } = user;
  return { accessToken, refreshToken, user: safeUser };
};

export const refresh = async (refreshToken: string) => {
  try {
    const payload = verifyToken(refreshToken) as TokenPayload;
    const newAccessToken = generateToken({ userId: payload.userId }, "15m");
    return { accessToken: newAccessToken };
  } catch {
    throw new AppError("Refresh token invalide ou expiré", 401);
  }
};
