import { Response, Request, NextFunction } from "express";
import {
  BadRequestError,
  NotFoundError,
  ServerError,
  UnauthorizeError,
} from "../errors/Errors.js";
import { SELECTED_USER_FIELDS } from "../config/constants/user.constants.js";
import User from "../models/user.model.js";

export const allUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await User.find().select(SELECTED_USER_FIELDS);
  if (!users) return next(new NotFoundError("Users not found"));
  res.status(200).send(users);
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const user = await User.findById(id).select(SELECTED_USER_FIELDS);
  console.log(user);
  if (!user) return next(new NotFoundError("User not found"));
  res.status(200).send(user);
};
