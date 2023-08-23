import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/customError";

const devErrors = (res: Response, err: Error) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      error: err.message,
      statusCode: err.statusCode,
      stackTrace: err.stack,
      err: err,
    });
  } else {
    res.status(500).json({
      error: err.message,
      statusCode: 500,
      stackTrace: err.stack,
      err: err,
    });
  }
};

const prodErrors = (res: Response, err: Error) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      error: err.message,
      statusCode: err.statusCode,
    });
  } else {
    res.status(500).json({
      error: "Something went wrong! Please try again later.",
      statusCode: 500,
    });
  }
};

const validationHandler = (err: Error) => {
  return new CustomError(err.message, 400);
};

const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === "development") {
    if (err.name === "ValidationError") err = validationHandler(err);
    devErrors(res, err);
  } else if (process.env.NODE_ENV === "production") {
    if (err.name === "ValidationError") err = validationHandler(err);
    prodErrors(res, err);
  }
};

const notFoundHadler = (req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError(`Not Found - ${req.originalUrl}`, 404);
  next(error);
};

export { globalErrorHandler, notFoundHadler };
