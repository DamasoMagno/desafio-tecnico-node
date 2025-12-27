import type { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { env } from "@/env";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const [, token] = authHeader.split(" ");
    const decoded = verify(token, env.JWT_SECRET) as { sub: string };

    if (!decoded) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = {
      id: decoded.sub,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
