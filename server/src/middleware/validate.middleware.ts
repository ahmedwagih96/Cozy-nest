import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import { BadRequestError } from "../errors";

const ValidateUserRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await Promise.all([
    check("firstName", "First Name is required").notEmpty().isString().run(req),
    check("lastName", "Last Name is required").notEmpty().isString().run(req),
    check("email", "Email is required").isEmail().run(req),
    check("password", "Password with 6 or more characters required")
      .isLength({
        min: 6,
      })
      .run(req),
  ]);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array()[0]?.msg || "Validation failed";
    throw new BadRequestError(errorMessage);
  }

  next();
};

const ValidateLoginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await Promise.all([
    check("email", "Email is required").isEmail().run(req),
    check("password", "Password with 6 or more characters required")
      .isLength({
        min: 6,
      })
      .run(req),
  ]);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array()[0]?.msg || "Validation failed";
    throw new BadRequestError(errorMessage);
  }

  next();
};

const ValidateCreateHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await Promise.all([
    check("name", "Name is required").notEmpty().isString().run(req),
    check("city", "City is required").notEmpty().isString().run(req),
    check("country", "Country is required").notEmpty().isString().run(req),
    check("description", "Description is required")
      .notEmpty()
      .isString()
      .run(req),
    check("type", "Hotel type is required").notEmpty().isString().run(req),
    check("adultCount", "Adult Count is required")
      .notEmpty()
      .isNumeric()
      .run(req),
    check("pricePerNight", "Price per night is required")
      .notEmpty()
      .isNumeric()
      .run(req),
    check("facilities", "Facilities are required")
      .notEmpty()
      .isArray()
      .run(req),
  ]);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array()[0]?.msg || "Validation failed";
    throw new BadRequestError(errorMessage);
  }

  next();
};

export { ValidateUserRegistration, ValidateLoginUser, ValidateCreateHotel };
