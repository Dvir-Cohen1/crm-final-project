import { Response, Request, NextFunction } from "express";
import { BadRequestError, ServerError } from "../errors/Errors.js";

import fs from "fs";

type File = {
  filename: string;
  buffer: Buffer;
};

export function uploadFile(
  file: File | undefined,
  res: Response,
  next: NextFunction
) {
  try {
    const filePath = `./public/${file?.filename}`;
    if (!file) {
      return next(new BadRequestError("image not provided"));
    }

    if (file?.buffer) {
      fs.writeFile(filePath, file.buffer, (err) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          // res.send("File uploaded successfully");
          console.log("File uploaded successfully")
        }
      });
    } else {
      return next(new ServerError("File buffer is undefined"));
    }
    return file?.filename;
  } catch (error) {
    console.log(error);
    next(new ServerError(Object(error)));
  }
}
