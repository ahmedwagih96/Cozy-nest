import { Request, Response } from "express";
import User from "../models/user.model";
import { NotFoundError, UnauthorizedError } from "../errors";
import bcrypt from "bcryptjs";

const loginUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  const token = user.generateAuthToken();

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 1000,
  });
  user = await User.findOne({ email });
  return res.status(200).json(user);
};

const validateTokenController = async (req: Request, res: Response) => {
  const user = await User.findById(req.userId);
  if (!user) {
    throw new NotFoundError("User Not Found");
  }

  const token = user.generateAuthToken();

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 1000,
  });

  res.status(200).send(user);
};

const logOutController = (req: Request, res: Response) => {
  return res
    .clearCookie("jwt", { httpOnly: true, secure: true })
    .status(200)
    .json({ message: "User logged out successfully" });
};
export { loginUserController, validateTokenController, logOutController };
