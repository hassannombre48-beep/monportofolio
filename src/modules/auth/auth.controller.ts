import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";
import { RegisterInput, LoginInput } from "./auth.types";

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: RegisterInput = req.body;
    const user = await authService.register(data);
    res.status(201).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: LoginInput = req.body;
    const result = await authService.login(data);
    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

export const refreshController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refresh(refreshToken);
    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};
