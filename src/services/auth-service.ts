import { JWT_SECRET_KEY } from "../config/environment";
import { prisma } from "../database";
import { HttpError } from "../errors/HttpError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(params: { username: string, email: string, password: string }) {
  const hashedPassword = bcrypt.hashSync(params.password, 10);
  const newUser = await prisma.user.create({
    data: {
      username: params.username,
      email: params.email,
      password: hashedPassword
    },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      updatedAt: true
    }
  });
  return newUser;
}

export async function login(params: { email: string, password: string }) {
  const user = await prisma.user.findUnique({
    where: { email: params.email }
  });
  if (!user) throw new HttpError(404, "user not found");
  const isValidPassword = bcrypt.compareSync(params.password, user.password);
  if (!isValidPassword) throw new HttpError(401, "invalid credentials");
  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET_KEY,
    { expiresIn: "7d" }
  );
  return token;
}