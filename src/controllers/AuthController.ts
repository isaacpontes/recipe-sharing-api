import { Request, Response } from "express";
import { z } from "zod";
import { login, register } from "../services/auth-service";

const LoginRequestBodySchema = z.object({
  email: z.string(),
  password: z.string()
});

const RegisterRequestBodySchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string()
});

export const AuthController = {
  login: async (req: Request, res: Response) => {
    const body = LoginRequestBodySchema.parse(req.body);
    const token = await login(body);
    res.json({ token });
  },

  register: async (req: Request, res: Response) => {
    const body = RegisterRequestBodySchema.parse(req.body);
    const newUser = await register(body);
    res.json(newUser);
  }
};
