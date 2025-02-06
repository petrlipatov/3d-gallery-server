import { Request } from "express";
import { tokenService } from "../services/token-service";

export function authMiddleware(req: Request, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return next(new Error("Не прошел авторизацию"));

    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) return next(new Error("Не прошел авторизацию"));

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) return next(new Error("Не прошел авторизацию"));

    console.log(userData);

    // @ts-ignore
    req.user = userData;
    next();
  } catch (err) {
    return next(new Error("Не прошел авторизацию"));
  }
}
