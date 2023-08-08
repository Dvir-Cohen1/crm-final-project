import Joi from "joi";
import { NextFunction } from "express";
import { BadRequestError } from "../errors/Errors.js";

// Middleware for validating request body using Joi schema
export function validateBody(
  requestBody: Request,
  schema: Joi.ObjectSchema,
  next: NextFunction
) {
  const { error, value } = schema.validate(requestBody);
  if (error) {
    return next(new BadRequestError(error.details[0].message));
  }
  return value;
}
