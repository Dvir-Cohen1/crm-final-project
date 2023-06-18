import { NextFunction } from "express";
import { BadRequestError } from "../errors/Errors.js";
import fs from "fs";
import path from "path";

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

export function uploadTasksAttachments(
  next: NextFunction,
  files: {} | undefined,
  folderName: string
) {
  try {
    if (!files) {
      return next(new BadRequestError("File not provided"));
    }

    // Check if the folder exists
    const folderPath = path.join("./public", folderName);
    const folderExists = fs.existsSync(folderPath);

    if (!folderExists) {
      // Create the folder if it doesn't exist
      fs.mkdirSync(folderPath);
    }

    const uploadedPaths: string[] = [];

    // Upload files to the folder
    Object.values(files).forEach((file: any) => {
      const filePath = path.join(folderPath, file.filename);

      // Create a readable stream from the temporary file path
      const readStream = fs.createReadStream(file.path);

      // Create a writable stream to the destination file path
      const writeStream = fs.createWriteStream(filePath);

      // Pipe the data from the read stream to the write stream
      readStream.pipe(writeStream);

      uploadedPaths.push(file?.filename);
    });

    return uploadedPaths;
    // Perform any necessary operations with the uploaded files
    // ...
  } catch (error) {
    next();
  }
}
