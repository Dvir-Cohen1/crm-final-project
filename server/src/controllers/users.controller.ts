import { Response, Request, NextFunction } from "express";
import {
  BadRequestError,
  NotFoundError,
  ServerError,
  UnauthorizeError,
} from "../errors/Errors.js";
import {
  SELECTED_PINNED_ITEMS_FIELDS,
  SELECTED_USER_FIELDS,
} from "../config/constants/user.constants.js";
import User from "../models/users/user.model.js";
import { deleteFile, uploadFile } from "../utils/files.util.js";
import { IRequestUserId, IUser } from "../types/global";
import { returnResponseObject } from "../utils/response.util.js";

export const allUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await User.find().select(SELECTED_USER_FIELDS).populate({
    path: "pinned_items",
    select: SELECTED_PINNED_ITEMS_FIELDS,
  });
  if (!users) return next(new NotFoundError("Users not found"));
  res.status(200).send(users);
};

export const getUserById = async (
  req: Request,
  res: Response,

  next: NextFunction
) => {
  const { id } = req.params;
  const user = await User.findById(id).select(SELECTED_USER_FIELDS).populate({
    path: "pinned_items",
    select: SELECTED_PINNED_ITEMS_FIELDS,
  });
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
  try {
    const file = req.file;
    const { userId } = req.params;
    const user: any = await User.findById(userId);
    console.log(file)
    uploadFile(next, file);

    user.imgSRC = `${process.env.BASE_ENDPOINT}${file?.filename}`;
    user.save();
    res.status(200).send({ error: false, data: user });
  } catch (error) {
    return next(new ServerError(String(error)));
  }
};

export const deleteProfileImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user: any = await User.findById(id);

    if (!user.imgSRC) {
      return next(new NotFoundError("Profile image not found!"));
    }

    // Delete file from server
    // deleteFile(user.imgSRC);

    user.imgSRC = null;
    user.save();

    res.status(200).send({ error: false, data: user });
  } catch (error) {
    return next(new ServerError(String(error)));
  }
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

export const pinItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { itemId } = req.params;

  try {
    const { userId }: IRequestUserId = req;
    const user: IUser | null = await User.findById(userId).select(
      SELECTED_USER_FIELDS
    );
    const pinnedItem = await user?.pinItem(itemId);

    if (!pinnedItem) {
      await user?.unpinItem(itemId);
      return res
        .status(200)
        .send(returnResponseObject(false, user, "Item unpinned"));
    }

    res.status(200).send(returnResponseObject(false, user, "Item pinned"));
  } catch (error) {
    return next(new ServerError(String(error)));
  }
};

export const removeAllPinItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId }: IRequestUserId = req;
  try {
    const user = await User.findById(userId).select(SELECTED_USER_FIELDS);

    if (user) {
      if (!user.pinned_items.length) {
        return;
      }

      user.pinned_items = []; // Set user pinned_items to an empty array
      await user.save(); // Save the updated user object

      res
        .status(200)
        .send(returnResponseObject(false, user, "All pinned items removed"));
    } else {
      // Handle case when user is not found which means hes unauthorized
      return next(new UnauthorizeError("Unauthorized"));
    }
  } catch (error) {
    console.log(error);
    return next(new ServerError(String(error)));
  }
};
