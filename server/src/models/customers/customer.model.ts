import mongoose from "mongoose";
import { ICustomer } from "../../types/global.js";
import { INDUSTRY_TYPE_ENUM } from "../../config/constants/customer.constant.js";

const customerSchema = new mongoose.Schema(
  {
    // Basic Information
    name: { type: String},
    email: { type: String, required: [true, "email is required"], unique: true },
    alternativeEmail: { type: String },
    phone: { type: String },
    address: { type: String },
    privatelyHeldCompany: { type: Number },

    // Additional Contact Information
    contactPerson: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String },

    // Company Details
    companyName: { type: String },
    companyWebsite: { type: String },
    companyLogo: { type: String },

    // Industry and Business Information
    industry: {
      type: String,
      enum: INDUSTRY_TYPE_ENUM, // Use the enum values as allowed options
    },
    companySize: { type: String },

    // Custom Fields
    // Add any additional custom fields here as needed

    // References to related entities
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],

    // Linked Customers (for Relationships)
    linkedCustomers: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    ],

    // Notes or Comments
    notes: { type: String },

    // Active status
    active: { type: Boolean, default: true },
  },
  // timestamps: createdAt and updatedAt
  {
    timestamps: true,
  }
);

const Customer = mongoose.model<ICustomer>("Customer", customerSchema);

export default Customer;
