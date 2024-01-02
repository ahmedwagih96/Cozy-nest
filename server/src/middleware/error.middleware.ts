import { NextFunction, Request, Response } from "express";
import { BaseError } from "../errors";

const ErrorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  return res.status(res.statusCode ? res.statusCode : 500).send({
    message: err.message ? err.message : "Something went wrong. Please try again later",
  });
};

export default ErrorHandlerMiddleware;
