import type { NextFunction, Request, Response } from "express";
import { ZodObject, ZodError } from "zod";

export const validate = (schema: ZodObject) => {
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: "Validation error",
          errors: err.cause,
        });
      }
      next(err);
    }
  };
};
