import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors";

const registerUserController = async (req: Request, res: Response) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    throw new BadRequestError("User already exists");
  }
  user = new User(req.body);
  await user.save();

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 86400000,
  });

  return res.sendStatus(200);
};

export { registerUserController };
