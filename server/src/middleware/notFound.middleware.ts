import { Request } from "express";
import { NotFoundError } from "../errors";

const NotFoundMiddleware = (req: Request) => {
  throw new NotFoundError(`Not found - ${req.originalUrl}`);
};

export default NotFoundMiddleware;
