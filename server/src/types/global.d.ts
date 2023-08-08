import { Response, Request, NextFunction } from "express";
import { Request as ExpressRequest } from "express"; // Import the correct Request type from the express library

import { Request } from "./interfaces"; // Adjust the import path based on your actual path

declare module "./interfaces" {
  interface Request {
    userId?: string;
  }
}

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

/*
 ** Tasks
 */
interface ICreateTaskPropsType extends Request {
  userId: string;
}

export type TTask = {
  _id: string;
  key: string;
  title: string;
  description: string;
  attachments?: [];
  comments?: any;
};

export type TTaskDataType = {
  _id: string;
  key: string;
  title: string;
  description: string;
  attachments?: [];
};

// export interface Request extends Request {
//   method: string;
//   url: string;
//   headers: { [key: string]: string };
//   ip?: string;
//   userId: string;
// }
export interface Request extends ExpressRequest {
  userId?: string;
  method: string;
  url: string;
  headers: IncomingHttpHeaders;
  ip?: string;
}

export interface SendLoggerFunction {
  (
    severity: string,
    message: string,
    options?: {} | null,
    request?: Request | null,
    requestId?: string
  ): void;
}

export interface ILogInfo {
  (
    message: string,
    options?: {} | null | undefined,
    request?: Request | null
  ): SendLoggerFunction;
}

/*
 ** Customers
 */

// Define the interface for the Customer schema
export interface ICustomer extends mongoose.Document {
  save: any;
  // Basic Information
  _id:string;
  name: string;
  email: string;
  alternativeEmail?: string;
  phone?: string;
  address?: string;
  privatelyHeldCompany?: number;

  // Additional Contact Information
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;

  // Company Details
  companyName?: string;
  companyWebsite?: string;
  companyLogo?: string;

  // Industry and Business Information
  industry?: string;
  companySize?: string;

  // Custom Fields
  // Add any additional custom fields here as needed

  // References to related entities
  users: mongoose.Schema.Types.ObjectId[];
  tasks: mongoose.Schema.Types.ObjectId[];
  projects: mongoose.Schema.Types.ObjectId[];

  // Linked Customers (for Relationships)
  linkedCustomers: mongoose.Schema.Types.ObjectId[];

  // Notes or Comments
  notes?: string;

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;

  // Additional Fields
  active?: boolean;

}

export type TSortOrder = "asc" | "desc";
