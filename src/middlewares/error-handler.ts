import { Response, Request, NextFunction } from "express";
import { getErrorMessage } from "../utils";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    next(err);
  }

  res.status(500).json({
    error: {
      message:
        getErrorMessage(err) ||
        "An error occurred. Please view logs for more details",
    },
  });
}
