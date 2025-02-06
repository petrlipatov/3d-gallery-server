import { Response, Request, NextFunction } from "express";
import { getErrorMessage } from "../utils";
import { CustomError } from "../errors/Custom-Base-Error";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    next(err);
  }

  if (err instanceof CustomError) {
    res
      .status(err.statusCode)
      .json({ error: { message: err.message, code: err.code } });
    return;
  }

  res.status(500).json({
    error: {
      message:
        getErrorMessage(err) ||
        "An error occurred. Please view logs for more details",
    },
  });
}
