import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors";
import Joi, { ValidationError, ValidationErrorItem } from "joi";

interface JoiValidationError extends ValidationError {
  details: ValidationErrorItem[];
}

const userRegistrationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const createHotelSchema = Joi.object({
  name: Joi.string().required().label("Name"),
  city: Joi.string().required().label("City"),
  country: Joi.string().required().label("Country"),
  description: Joi.string().required().label("Description"),
  type: Joi.string().required().label("Type"),
  pricePerNight: Joi.number().required().label("Price Per Night"),
  adultCount: Joi.number().required().label("Adult Count"),
  childCount: Joi.number().required().label("Child Count"),
  starRating: Joi.number().required().label("Star Rating"),
  facilities: Joi.array().required().label("Facilities"),
});

const validateWithJoi =
  (schema: Joi.ObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      const joiError = error as JoiValidationError;
      throw new BadRequestError(
        joiError.details[0].message.replace(/["\\]/g, "")
      );
    }
  };

const ValidateUserRegistration = validateWithJoi(userRegistrationSchema);
const ValidateLoginUser = validateWithJoi(loginUserSchema);
const ValidateCreateHotel = validateWithJoi(createHotelSchema);

export { ValidateUserRegistration, ValidateLoginUser, ValidateCreateHotel };
