import { Request, Response } from "express";
import User from "../models/user.model";
import { BadRequestError } from "../errors";

const registerUserController = async (req: Request, res: Response) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    throw new BadRequestError("User already exists");
  }
  user = new User(req.body);
  await user.save();

  const token = user.generateAuthToken();

  user = await User.findOne({ email: req.body.email });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 1000,
  });

  return res.status(200).json(user);
};

export { registerUserController };
