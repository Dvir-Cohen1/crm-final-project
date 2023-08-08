import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import { emailRegex } from "../../config/constants/regex.constant.js";
import { Secret } from "jsonwebtoken";
import { IUser } from "../../types/global.js";

const userSchema: Schema<IUser> = new Schema(
  {
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
    phoneNumber: {
      type: Number,
      required: false,
    },
    role: {
      type: String,
      required: false,
      default: "Member",
    },
    imgSRC: {
      type: String,
    },
    pinned_items: {
      type: [Schema.Types.ObjectId],
      ref: "Task",
      default: [],
      required: false,
    },

    jwt_ac_token: {
      type: String,
    },
    jwt_rf_token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

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
userSchema.methods.deleteAcToken = function () {
  this.jwt_ac_token = null;
  this.save();
};

userSchema.methods.pinItem = async function (itemId: string) {
  if (!this.pinned_items.includes(itemId)) {
    this.pinned_items.push(itemId);
    await this.save();
    return true;
  } else {
    return false;
  }
};

userSchema.methods.unpinItem = async function (itemId: string) {
  const index = this.pinned_items.indexOf(itemId);
  if (index > -1) {
    this.pinned_items.splice(index, 1);
    await this.save();
  }
};

const User = model<IUser>("User", userSchema);

export default User;
