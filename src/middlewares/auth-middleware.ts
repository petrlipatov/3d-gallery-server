import { Request } from "express";
import { tokenService } from "../services/token-service";
import { UnauthorizedError } from "../errors";

export function authMiddleware(req: Request, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return next(new UnauthorizedError());

    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) return next(new UnauthorizedError());

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) return next(new UnauthorizedError());

    // @ts-ignore
    req.user = userData;
    next();
  } catch (err) {
    return next(new UnauthorizedError());
  }
}
