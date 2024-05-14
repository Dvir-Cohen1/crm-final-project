import Joi from "joi";
import { INDUSTRY_TYPE_ENUM } from "../config/constants/customer.constant.js";

// Define the Joi schema for Customer validation
const customerJoiSchema = Joi.object({
  // Basic Information
  name: Joi.string().min(3).max(25).messages({
    "any.required": "Name is required.",
    "string.empty": "Name cannot be empty.",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required.",
    "string.email": "Email must be a valid email address.",
    "string.empty": "Email cannot be empty.",
    "string.min": "Name must be at least {#limit} characters long.",
    "string.max": "Name cannot be longer than {#limit} characters.",
  }),
  alternativeEmail: Joi.string().allow("").optional(), // Optional additional email address
  phone: Joi.string().allow("").optional(), // Optional phone number
  address: Joi.string().allow("").optional(), // Optional address
  privatelyHeldCompany: Joi.number().optional(), // Optional field for indicating if the company is privately held

  // Additional Contact Information
  contactPerson: Joi.string().allow("").optional(), // Optional contact person's name
  contactEmail: Joi.string().email().allow("").optional(), // Optional contact person's email address
  contactPhone: Joi.string().allow("").optional(), // Optional contact person's phone number

  // Company Details
  companyName: Joi.string().allow("").optional(), // Optional company name
  companyWebsite: Joi.string().uri().allow("").optional(), // Optional company website URL
  companyLogo: Joi.string().allow("").optional(), // Optional company logo URL or file path

  // Industry and Business Information
  industry: Joi.string()
    .valid(...INDUSTRY_TYPE_ENUM)
    .allow("")
    .optional(), // Optional industry of the company
  companySize: Joi.string().allow("").optional(), // Optional size of the company

  // References to related entities
  users: Joi.array().items(Joi.string()).optional(), // Optional array of user IDs related to the customer
  tasks: Joi.array().items(Joi.string()).optional(), // Optional array of task IDs related to the customer
  projects: Joi.array().items(Joi.string()).optional(), // Optional array of project IDs related to the customer

  // Linked Customers (for Relationships)
  linkedCustomers: Joi.array().items(Joi.string()).optional(), // Optional array of customer IDs linked to this customer (for Relationships)

  // Notes or Comments
  notes: Joi.string().allow("").optional(), // Optional notes or comments

  // Active status
  active: Joi.boolean().optional(), // Optional field indicating whether the customer is active or not
});

export default customerJoiSchema;
