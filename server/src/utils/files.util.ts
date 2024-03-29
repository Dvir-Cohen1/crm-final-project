import { NextFunction } from "express";
import { BadRequestError } from "../errors/Errors.js";
import fs, { createReadStream } from "fs";
import path from "path";
import sharp from "sharp";
import archiver from "archiver";

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


// Upload Files
export async function uploadFiles(
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

    type fileData = {
      name: string;
      type: string;
      size: number;
    };

    const uploadPromises: Promise<fileData>[] = [];

    Object.values(files).forEach((file: Express.Multer.File) => {
      const filePath = path.join(folderPath, file.filename);
      const readStream = fs.createReadStream(file.path);
      const writeStream = fs.createWriteStream(filePath);

      const fileData = {
        name: file.filename,
        type: file.mimetype,
        size: file.size,
      };

      const uploadPromise = new Promise<fileData>((resolve, reject) => {
        readStream
          .pipe(
            sharp().resize(1920).on("error", reject) // Resize images with sharp
          )
          .pipe(
            writeStream
              .on("finish", () => resolve(fileData))
              .on("error", reject)
          );
      });
      uploadPromises.push(uploadPromise);
    });

    const uploadedPaths = await Promise.all(uploadPromises);

    return uploadedPaths;
  } catch (error) {
    return { isError: true, error };
  }
}

// Delete all files
export function deleteAllFiles(folderId: string) {
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
export function deleteOneFile(folderId: string, fileName: string) {
  try {
    const folderPath = `./public/${folderId}`;
    const files = fs.readdirSync(folderPath);

    if (!files || files.length <= 0) {
      return null;
    }

    const filePath = `./public/${folderId}/${fileName}`;
    fs.unlinkSync(filePath);
    // files.forEach((file) => {

    // });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// // Download all files as .zip
// export function downloadAllFilesAsZip(folderId: string) {
//   try {
//     const folderPath = `./public/${folderId}`;
//     const date = new Date().getDay().toString();
//     // Create a new zip archive
//     const archive = archiver("zip", {
//       zlib: { level: 9 }, // Set the compression level (optional)
//     });

//     // Set the output file name
//     const zipFileName = `${date}-${folderId}.zip`;

//     // Pipe the response to the archive
//     archive.pipe(res);
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }

// const folderPath = `./public/${folderId}`;
// const files = fs.readdirSync(folderPath);

// if (!files || files.length <= 0) {
//   return null;
// }

// const zipFilePath = `./public/${folderId}.zip`;
// const output = fs.createWriteStream(zipFilePath);
// const archive = archiver("zip", { zlib: { level: 9 } });

// output.on("close", () => {
//   console.log("Zip file created:", zipFilePath);
// });

// archive.on("error", (err: any) => {
//   throw err;
// });

// archive.pipe(output);

// files.forEach((file) => {
//   const filePath = path.join(folderPath, file);
//   archive.file(filePath, { name: file });
// });

// archive.finalize();

// return zipFilePath;
