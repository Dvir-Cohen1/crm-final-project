import { NextFunction, Request, Response } from "express";
import User from "../models/user.model.js";
import {
  BadRequestError,
  NotFoundError,
  ServerError,
  UnauthorizeError,
} from "../errors/Errors.js";
import {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
} from "../services/jwt.services.js";
import { JwtPayload } from "jsonwebtoken";
import { SELECTED_USER_FIELDS } from "../config/constants/user.constants.js";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return next(new BadRequestError("Password Don't match"));
  }

  try {
    const user = await User.create({ firstName, lastName, email, password });
    res.status(201).send({ error: false, data: user });
  } catch (error: any) {
    if (typeof "MongoError") {
      return next(new ServerError(error.errmsg));
    }
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (!email && !password)
    return new BadRequestError("email / password not provided");

  const user = await User.findOne({ email });
  if (!user) return next(new NotFoundError());

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch)
    return next(new UnauthorizeError("email / password incorrect"));
 
  const jwt_ac_token = createAccessToken(user._id);
  const jwt_rf_token = createRefreshToken(user._id);

  user.setJwtTokens(jwt_ac_token, jwt_rf_token);
  res.status(200).send({ error: false, data: user, token: jwt_ac_token });
}

export async function isLogin(req: Request, res: Response, next: NextFunction) {
  const { token } = req.body;
  if (!token) return next(new UnauthorizeError());

  const decoded = verifyAccessToken(token) as JwtPayload;
  const { userId } = decoded;
  const user = await User.findById(userId).select(SELECTED_USER_FIELDS);

  res.status(200).send({ isAuthenticated: true, user: user });
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  const { token } = req.body;
  const { userId } = req.params;

  // return next(new UnauthorizeError());
  if (!token && !userId) return next(new BadRequestError());

  const user = await User.findOne({ _id: userId });

  user?.deleteAcToken();
  res.status(200).end();
}
