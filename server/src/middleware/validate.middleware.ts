import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import { BadRequestError } from "../errors";

const ValidateUserRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await Promise.all([
    check("firstName", "First Name is required").isString().run(req),
    check("lastName", "Last Name is required").isString().run(req),
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

export { ValidateUserRegistration, ValidateLoginUser };
