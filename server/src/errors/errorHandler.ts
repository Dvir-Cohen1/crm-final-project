import { NextFunction, Response, Request } from "express";

import {
  NotFoundError,
  BadRequestError,
  ServerError,
  UnauthorizeError,
} from "./Errors.js";
function generateCustomErrorResponse(
  res: Response,
  error: any,
  statusCode: number
) {
  return res.status(Number(statusCode)).json({
    error: true,
    message: error.message,
    stack:
      process.env.NODE_ENV === "development" && error.stack ? error.stack : {},
  });
}

export default function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  switch (error.constructor) {
    case NotFoundError:
      return generateCustomErrorResponse(res, error, 404);

    case UnauthorizeError:
      return generateCustomErrorResponse(res, error, 403);

    case BadRequestError:
      generateCustomErrorResponse(res, error, 400);
      break;

    case ServerError:
      generateCustomErrorResponse(res, error, 500);
      break;

    default:
      res.status(500).json("Somthing went wrong!");
      break;
  }
}
