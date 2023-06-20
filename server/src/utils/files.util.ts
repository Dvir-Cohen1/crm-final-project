import { NextFunction } from "express";
import { BadRequestError } from "../errors/Errors.js";
import fs from "fs";
import path from "path";
import sharp from "sharp";

type File = {
  filename: string;
  buffer: Buffer;
};

export function uploadFile(next: NextFunction, file: File | undefined) {
  try {
    if (!file) {
      return next(new BadRequestError("File not provided"));
    }
    console.log(file);
    const filePath = `./public/${file?.filename}`;
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

export async function uploadTasksAttachments(
  next: NextFunction,
  files: Express.Multer.File | {} | undefined,
  folderId: string
) {
  try {
    if (!files) {
      return next(new BadRequestError("File not provided"));
    }

    const folderPath = path.join("./public", folderId);
    const folderExists = fs.existsSync(folderPath);

    if (!folderExists) {
      fs.mkdirSync(folderPath);
    }

    const uploadPromises: Promise<string>[] = [];

    Object.values(files).forEach((file: Express.Multer.File) => {
      const filePath = path.join(folderPath, file.filename);
      const readStream = fs.createReadStream(file.path);
      const writeStream = fs.createWriteStream(filePath);

      const uploadPromise = new Promise<string>((resolve, reject) => {
        readStream
          .pipe(
            sharp().resize(1920).on("error", reject) // Resize images with sharp
          )
          .pipe(
            writeStream
              .on("finish", () => resolve(file.filename))
              .on("error", reject)
          );
      });

      uploadPromises.push(uploadPromise);
    });

    const uploadedPaths = await Promise.all(uploadPromises);

    return uploadedPaths;
  } catch (error) {
    next();
  }
}

export function deleteAllTaskAttachments(folderId: string) {
  try {
    const folderPath = `./public/${folderId}`;
    const files = fs.readdirSync(folderPath);

    if (!files || files.length <= 0) {
      return null;
    }

    files.forEach((file) => {
      const filePath = `./public/${folderId}/${file}`;
      fs.unlinkSync(filePath);
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
