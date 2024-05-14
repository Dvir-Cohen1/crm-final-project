import { NextFunction, Response, Request } from "express";

import {
  NotFoundError,
  BadRequestError,
  ServerError,
  UnauthorizeError,
  ConflictError,
} from "./Errors.js";
import { sendLogger } from "../utils/logger.js";
import { ICreateTaskPropsType } from "../types/global.js";
function generateCustomErrorResponse(
  res: Response,
  req: Request,
  error: any,
  statusCode: number,
  constructor: string,
  isServerError: boolean
) {
  const { userId } = req as ICreateTaskPropsType;
  const isProduction = process.env.NODE_ENV === "production" ? true : false;

  // Log error
  sendLogger(isServerError ? "error" : "warn", error.message, {
    statusCode: statusCode,
    constructor: constructor,
    userInformation: {
      userId: userId,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    },
    requestInformation: {
      path: req.route?.path ? req.route?.path : null,
      originalUrl: req.originalUrl ? req.originalUrl : null,
      params: req.params ? req.params : null,
      query: req.query ? req.query : null,
      payLoad: req.body ? req.body : null,
    },
    stackTrace: error.stack,
  });

  if (!isProduction) {
    console.log(error.message);
  }

  // Build the error response object
  return res.status(Number(statusCode)).json({
    error: true,
    message: error.message,
    stack:
      !isProduction && error.stack ? error.stack : {},
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
      generateCustomErrorResponse(res, req, error, 404, "NotFoundError", false);
      break;
    case UnauthorizeError:
      generateCustomErrorResponse(
        res,
        req,
        error,
        403,
        "UnauthorizeError",
        false
      );
      break;
    case BadRequestError:
      generateCustomErrorResponse(
        res,
        req,
        error,
        400,
        "BadRequestError",
        false
      );
      break;
    case ServerError:
      generateCustomErrorResponse(res, req, error, 500, "ServerError", true);
      break;
    case ConflictError:
      generateCustomErrorResponse(res, req, error, 500, "ConflictError", true);
      break;
    default:
      generateCustomErrorResponse(res, req, error, 500, "Error", true);
      break;
  }
}
