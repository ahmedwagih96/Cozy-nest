import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UnauthorizedError } from "../errors";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const VerifyTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["jwt"];
  if (!token) {
    throw new UnauthorizedError("Access Denied");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (error) {
    throw new UnauthorizedError("Access Denied");
  }
};

export default VerifyTokenMiddleware;
