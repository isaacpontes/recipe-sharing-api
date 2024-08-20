// express.d.ts
import { User } from "@prisma/client";
import { Request } from "express";

declare global {
  namespace Express {
    export interface Request {
      authenticatedUser?: User;
    }
  }
}
