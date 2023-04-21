import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import { emailRegex } from "../config/constants/regex.constant.js";
import { Secret } from "jsonwebtoken";

interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role?: string[];
  jwt_ac_token?: Secret;
  jwt_rf_token?: Secret;
  comparePassword: Function
  setJwtTokens: Function
}

const userSchema: Schema<IUser> = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    match: [emailRegex, "Invalid email address"],
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: [String],
    required: false,
    default: "Member",
  },
  jwt_ac_token: {
    type: String,
  },
  jwt_rf_token: {
    type: String,
  },
});

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (plainPassword: string) {
  const isMatch = await bcrypt.compare(plainPassword, this.password);
  return isMatch;
};

userSchema.methods.setJwtTokens = function (
  accessToken: string,
  refreshToken: string
) {
  this.jwt_ac_token = accessToken;
  this.jwt_rf_token = refreshToken;
  this.save();
};

const User = model<IUser>("User", userSchema);

export default User;
