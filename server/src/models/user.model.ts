import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface UserType {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface UserDocument extends Document, UserType {
  generateAuthToken(): string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function (this: UserDocument) {
  const token = jwt.sign(
    { userId: this._id },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
