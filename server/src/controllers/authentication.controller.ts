import { NextFunction, Request, Response } from "express";
import { logInfo } from "../utils/logger.js";
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
import {
  SELECTED_PINNED_ITEMS_FIELDS,
  SELECTED_USER_FIELDS,
} from "../config/constants/user.constants.js";

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
    logInfo("User registered", req);
    res.status(201).send({ error: false, data: user });
  } catch (error: any) {
    if (typeof "MongoError") {
      return next(new ServerError(error.errmsg));
    }
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return new BadRequestError("email / password not provided");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(new NotFoundError("User not found"));
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return next(new UnauthorizeError("Password incorrect"));
    }

    const jwt_ac_token = createAccessToken(user._id);
    const jwt_rf_token = createRefreshToken(user._id);

    user.setJwtTokens(jwt_ac_token, jwt_rf_token);

    logInfo("User login", req);

    res.status(200).send({ error: false, data: user, token: jwt_ac_token });
  } catch (error) {
    next(new ServerError(String(error)));
  }
}

export async function isLogin(req: any, res: Response, next: NextFunction) {
  try {
    const { userId } = verifyAccessToken(req.token) as JwtPayload;

    const user = await User.findById(userId)
      .select(SELECTED_USER_FIELDS)
      .populate({
        path: "pinned_items",
        select: SELECTED_PINNED_ITEMS_FIELDS,
      });

    if (!user) {
      Promise.reject();
    }

    res.status(200).send({ isAuthenticated: true, user });
  } catch (error) {
    console.log(error);
    next(new ServerError(String(error)));
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  const { token } = req.body;
  const { userId } = req.params;

  // return next(new UnauthorizeError());
  if (!token && !userId) {
    return next(new BadRequestError());
  }
  try {
    const user = await User.findOne({ _id: userId });
    user?.deleteAcToken();

    logInfo("User logout", req);

    res.status(200).end();
  } catch (error) {
    next(new ServerError(String(error)));
  }
}
