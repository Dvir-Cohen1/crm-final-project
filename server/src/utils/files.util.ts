import { NextFunction } from "express";
import { BadRequestError } from "../errors/Errors.js";
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

    fs.writeFileSync(filePath, file.buffer);

    return file?.filename;
  } catch (error) {
    next();
  }
}

export function deleteFile(filename: string) {
  const filePath = `/public/${filename}`;
  fs.unlinkSync(filePath);
  return filename;
}
