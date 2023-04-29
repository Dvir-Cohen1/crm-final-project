import { Response, Request, NextFunction } from "express";
import {
  BadRequestError,
  NotFoundError,
  ServerError,
  UnauthorizeError,
} from "../errors/Errors.js";

import { SELECTED_USER_FIELDS } from "../config/constants/user.constants.js";
import User from "../models/user.model.js";
import fs from "fs";
import { uploadFile } from "../utils/uploadFile.js";

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

  if (!user) return next(new NotFoundError("User not found"));
  res.status(200).send(user);
};

export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, email, password } = req.body;
  const role = String(req.body.role).toLocaleUpperCase();
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
    });
    res.status(201).send({ error: false, data: user });
  } catch (error: unknown) {
    next(new ServerError(String(error)));
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  res.status(200).send({ error: false, data: user });
};

export const uploadProfileImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const file = req.file;
  // console.log(file?.filename)
  const fileName = uploadFile(file, res, next);
  const { userId } = req.params;
  // console.log(process.env.BASE_ENDPOINT)

  const user: any = await User.findById(userId);
  user.imgSRC = `${process.env.BASE_ENDPOINT}${file?.filename}`;
  user.save();
};
