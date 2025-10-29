import type { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export const validate =
  <T extends ZodType<any>>(schema: T) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      {
        return res.status(400).json({ success: false, errors: result.error });
      }
    }
    req.body = result.data;
    next();
  };
