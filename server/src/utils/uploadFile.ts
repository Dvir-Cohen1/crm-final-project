import { Response, Request, NextFunction } from "express";
import { BadRequestError, ServerError } from "../errors/Errors.js";
import fs from "fs";

type File = {
  filename: string;
  buffer: Buffer;
};

export function uploadFile(next: NextFunction, file: File | undefined) {
  try {
    const filePath = `./public/${file?.filename}`;
    if (!file) {
      return next(new BadRequestError("image not provided"));
    }

    fs.writeFile(filePath, file.buffer, (err) => {
      if (err) {
        return next(new ServerError(Object(err)));
      } else {
        return file?.filename;
      }
    });

    return file?.filename;
  } catch (error) {
    next();
  }
}

export function deleteFile(next: NextFunction, filename: string) {
  try {
    const filePath = `./public/${filename}`;

    fs.unlink(filePath, (err) => {
      if (err) {
        return next(new ServerError(Object(err)));
      } else {
        return filename;
      }
    });

    return filename;
  } catch (error) {
    next(error);
  }
}
