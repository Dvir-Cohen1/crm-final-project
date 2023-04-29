import { Request, Response, NextFunction } from "express";
import { UnauthorizeError } from "../errors/Errors.js";
import { verifyAccessToken } from "../services/jwt.services.js";

interface CustomRequest extends Request {
  userId?: string;
}

const authJwtTokenVerify = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = Array.isArray(req.headers["access-token"])
      ? req.headers["access-token"][0]
      : req.headers["access-token"];

    // if (!token) return next(new UnauthorizeError());
    // const decodedToken = verifyAccessToken(token);
    // // console.log(decodedToken.userId);
    // if (typeof decodedToken === "string") {
    //   console.log(decodedToken)
    //   req.userId = decodedToken;
    // } else {
    //   // console.log(decodedToken.userId)
    //   req.userId = decodedToken.userId;
    //   // req.userId = decodedToken.sub as string;
    // }
    // console.log(req.userId)
    next();
  } catch (error) {
    next(new UnauthorizeError());
  }
};

export default authJwtTokenVerify;
