import { Handler } from "express";
import { HttpError } from "../errors/HttpError";
import { JWT_SECRET_KEY } from "../config/environment";
import { prisma } from "../database";
import jwt from "jsonwebtoken";

export const ensureAuth: Handler = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "token missing" });
  try {
    const payload = jwt.verify(token, JWT_SECRET_KEY) as { id: number, email: string };
    const user = await prisma.user.findUnique({
      where: { id: payload.id }
    });
    if (!user) throw new HttpError(404, "user not found");
    req.authenticatedUser = user;
    next();
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.status).json({ message: error.message });
    } else if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "internal server error" });
    }
  }
}