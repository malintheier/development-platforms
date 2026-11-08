import jwt from "jsonwebtoken";
import { getRequiredEnv } from "../db.js";
import type { Request, Response, NextFunction } from "express";
export interface AuthLocals {
  userId: number;
}
const jwtSecret = getRequiredEnv("JWT_SECRET");
export function authenticateToken(
  req: Request,
  res: Response<unknown, AuthLocals>,
  next: NextFunction,
) {
  const authHeader = req.headers["authorization"];
  const parts = authHeader?.split(" ");
  const token = parts?.[1];
  if (!token || parts?.length !== 2 || parts?.[0] !== "Bearer") {
    return res.status(401).json({ error: "A Bearer token is required" });
  }
  jwt.verify(token, jwtSecret, (error, user) => {
    if (error) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    if (!user || typeof user === "string") {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    if (
      typeof user.userId !== "number" ||
      !Number.isSafeInteger(user.userId) ||
      user.userId <= 0
    ) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    res.locals.userId = user.userId;
    next();
  });
}
