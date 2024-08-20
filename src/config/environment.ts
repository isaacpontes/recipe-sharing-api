import { get } from "env-var";

export const PORT = get("PORT").default(3000).asIntPositive();

export const JWT_SECRET_KEY = get("JWT_SECRET_KEY").required().asString();