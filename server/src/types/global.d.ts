import { Response, Request, NextFunction } from "express";

export interface IUser extends Document {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber?: Number;
  role?: string[];
  imgSRC?: string;
  pinned_items?: any;
  jwt_ac_token?: Secret;
  jwt_rf_token?: Secret;
  comparePassword: Function;
  setJwtTokens: Function;
  deleteAcToken: Function;
  isModified: Function;
  pinItem: any;
  unpinItem: Function;
}

export interface IRequestUserId extends Request {
  userId?: string | null | undefined;
  itemId?: string | null | undefined;
}


interface ICreateTaskPropsType extends Request {
  userId: string;
}