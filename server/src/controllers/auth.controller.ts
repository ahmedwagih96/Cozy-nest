import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors";
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

  return res.status(200).json({ userId: user._id });
};

export { loginUserController };
