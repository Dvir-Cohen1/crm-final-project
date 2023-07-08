import { Request, Response, NextFunction } from "express";
import { UnauthorizeError } from "../errors/Errors.js";
import { verifyAccessToken } from "../services/jwt.services.js";

interface CustomRequest extends Request {
  userId?: string;
  token?:string;
}

const authJwtTokenVerify = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = Array.isArray(req.headers["ac-token"])
      ? req.headers["ac-token"][0]
      : req.headers["ac-token"];

    if (!token)
      return next(new UnauthorizeError());
    const decodedToken = verifyAccessToken(token);

    if (typeof decodedToken === "string") {
      req.userId = decodedToken;
    } else {
      req.userId = decodedToken.userId;
    }
    req.token = token
    next();
  } catch (error) {
    next(new UnauthorizeError());
  }
};

export default authJwtTokenVerify;
