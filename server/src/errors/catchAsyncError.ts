import { NextFunction, Response, Request } from "express";

const catchAsyncError =
  (controller: Function) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log("from catchAsync middleware")
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };


export default catchAsyncError;
