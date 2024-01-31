import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NotFoundError, UnauthorizedError } from "../errors";
import Hotel from "../models/hotel.model";
import { HotelDocument } from "../types/types";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      hotel: HotelDocument;
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

const VerifyHotelOwnership = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  VerifyTokenMiddleware(req, res, async () => {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      throw new NotFoundError("Hotel Not Found");
    }
    if (hotel.user.toString() !== req.userId) {
      throw new UnauthorizedError("Access Denied");
    }
    req.hotel = hotel;
    next();
  });
};

export { VerifyTokenMiddleware, VerifyHotelOwnership };
