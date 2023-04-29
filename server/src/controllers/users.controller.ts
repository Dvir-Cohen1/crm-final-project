import { Response, Request, NextFunction } from "express";
import {
  BadRequestError,
  NotFoundError,
  ServerError,
} from "../errors/Errors.js";
import { SELECTED_USER_FIELDS } from "../config/constants/user.constants.js";
import User from "../models/user.model.js";
import { deleteFile, uploadFile } from "../utils/uploadFile.js";

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
  const role = String(req.body.role).toLocaleLowerCase();
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
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (id == req.userId) {
    return next(
      new BadRequestError("Cant delete the user you are logged into")
    );
  }

  const user = await User.findByIdAndDelete(id);
  res.status(200).send({ error: false, data: user });
};

export const uploadProfileImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const file = req.file;
  const { userId } = req.params;
  const user: any = await User.findById(userId);

  if (!user.imgSRC) {
    uploadFile(next, file);
  } else {
    const exsistedFile = user.imgSRC.split("/").at(-1);
    deleteFile(next, exsistedFile);
  }

  user.imgSRC = `${process.env.BASE_ENDPOINT}${file?.filename}`;
  user.save();
  res.status(200).send({ error: false, data: user });
};

export const editUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (!id) {
    return next(new BadRequestError("ID not provided"));
  }

  const { firstName, lastName, email, phoneNumber, role } = req.body;
  if (!firstName || !lastName || !email || !phoneNumber || !role) {
    return next(new BadRequestError());
  }

  try {
    const user: any = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, email, phoneNumber, role },
      { new: true }
    );
    res.status(200).send({ error: false, data: user });
  } catch (error) {
    return next(new ServerError(String(error)));
  }
};
