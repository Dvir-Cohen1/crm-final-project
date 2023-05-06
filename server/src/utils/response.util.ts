import { Response } from "express";

interface ApiResponse extends Response {
  error: boolean;
  message?: string;
  data?: any;
}

export const sendApiResponse = (res: Response, response: ApiResponse) => {
  res.status(200).send(response);
};

export const sendApiError = (res: Response, error: Error, message?: string) => {
  console.error(error);
  res.status(500).send({
    error: true,
    message: message || "Internal Server Error",
  });
};
