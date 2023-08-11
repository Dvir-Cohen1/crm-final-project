import Customer from "../models/customers/customer.model.js";
import {
  BadRequestError,
  ServerError,
  NotFoundError,
  ConflictError,
} from "../errors/Errors.js";
import { Request, Response, NextFunction } from "express";
import customerJoiSchema from "../validations/customerValidation.js";
import { validateBody } from "../middlewares/bodyValidation.middleware.js";
import { ICustomer, TSortOrder } from "../types/global.js";
import {
  DEFAULT_SORT_FIELD,
  SEARCH_FIELDS,
  SELECT_CUSTOMER_FIELDS,
} from "../config/constants/customer.constant.js";
import { QueryOptions } from "mongoose";
import {
  getPopulatedCustomerById,
  getPopulatedCustomers,
  getPopulatedCustomersWithOptions,
} from "../services/customers.service.js";
import { buildSearchQuery } from "../helpers/customers.helper.js";
import { SELECTED_USER_FIELDS } from "../config/constants/user.constants.js";

// Get all customers
export async function getAllCustomers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Get sorting and limiting options from query parameters (if provided)
    const sortField: string =
      (req.query.sortField as string) || DEFAULT_SORT_FIELD;
    const sortOrder: TSortOrder =
      req.query.sortOrder === "desc" ? "desc" : "asc";
    const limit: number = parseInt(req.query.limit as string, 10) || 25;

    // Validate the limit value to be a positive integer (if provided)
    if (limit <= 0 || isNaN(limit)) {
      return next(
        new BadRequestError(
          "Invalid limit value. Limit must be a positive integer"
        )
      );
    }

    // Build the options object for the find query
    const options: QueryOptions = {
      sort: { [sortField]: sortOrder === "asc" ? 1 : -1 },
      limit,
    };

    // Execute the find query with the specified options
    const customers: ICustomer[] | null = await getPopulatedCustomers(options);

    // Handle the case when no customers are found
    if (!customers || customers.length === 0) {
      return next(new NotFoundError("No customers found"));
    }

    // Send the response with the customers data
    res.status(200).json(customers);
  } catch (error) {
    // Handle errors here
    next(new ServerError(String(error)));
  }
}

// Get a single customer by ID
export async function getCustomerById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { customerId } = req.params;

    // Check if customerId is provided
    if (!customerId) {
      return next(new BadRequestError("Customer id not provided"));
    }

    const customer = await getPopulatedCustomerById(customerId);

    if (!customer) {
      return next(new NotFoundError("Customer not found"));
    }

    res.status(200).json(customer);
  } catch (error) {
    next(new ServerError(String(error)));
  }
}

// Create a new customer
export async function createCustomer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.body) {
      return next(new BadRequestError());
    }

    // Validate the request body against the Joi schema
    const validatedData = validateBody(req.body, customerJoiSchema, next);

    // Check if a customer with the same email already exists
    const existingCustomer = await Customer.findOne(
      { email: validatedData.email },
      { email: 1 } // Selective projection to retrieve only the email field
    ).lean();

    if (existingCustomer) {
      return next(
        new ConflictError("A customer with this email already exists.")
      );
    }

    // Create the customer in the database
    const customer = await Customer.create(validatedData);
    res.status(201).json(customer);
  } catch (error) {
    next(new ServerError(String(error)));
  }
}

// Update a customer by ID
export async function updateCustomer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { customerId } = req.params;

    // Check if customerId is provided
    if (!customerId) {
      return next(new BadRequestError("Customer id not provided"));
    }

    // Validate the request body against the Joi schema
    const validatedObject = validateBody(req.body, customerJoiSchema, next);

    // Update the customer
    const customer = await Customer.findByIdAndUpdate(
      customerId,
      validatedObject,
      { new: true }
    );

    if (!customer) {
      return next(new NotFoundError("Customer not found"));
    }

    res.json(customer);
  } catch (error) {
    next(new ServerError(String(error)));
  }
}

// Delete a customer by ID
export async function deleteCustomer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { customerId } = req.params;

    // Check if customerId provided
    if (!customerId) {
      return next(new BadRequestError("Customer id not provided"));
    }

    // Remove customer from database
    const customer = await Customer.findByIdAndRemove(customerId);
    if (!customer) {
      return next(new NotFoundError("Customer not found"));
    }

    res
      .status(202)
      .json({ error: false, message: "Customer deleted successfully" });
  } catch (error) {
    next(new ServerError(String(error)));
  }
}

// Link customers together
export async function linkCustomers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const customerIds = req.body;

    if (!customerIds || !Array.isArray(customerIds) || customerIds.length < 2) {
      return next(
        new BadRequestError("Please provide at least two customerIds to link.")
      );
    }

    const customersToUpdate: ICustomer[] = await Customer.find({
      _id: { $in: customerIds },
    });

    if (customersToUpdate.length !== customerIds.length) {
      return next(new NotFoundError("One or more customers not found."));
    }

    // Update the linkedCustomers field for each customer
    for (const customer of customersToUpdate) {
      customer.linkedCustomers = customerIds.filter(
        (id) => id !== customer._id.toString()
      );
      await customer.save();
    }

    res.status(200).json({ message: "Customers linked successfully." });
  } catch (error) {
    next(new ServerError(String(error)));
  }
}

// Find linked customers for a given customer
export async function findLinkedCustomers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { customerId } = req.params;

    if (!customerId) {
      return next(new BadRequestError("Customer id not provided."));
    }

    const customer: ICustomer | null = await Customer.findById(
      customerId
    ).lean();

    if (!customer) {
      return next(new NotFoundError("Customer not found."));
    }

    // Find linked customers by their ObjectIds
    const linkedCustomerIds: string[] = customer.linkedCustomers || [];

    const linkedCustomers: ICustomer[] = await Customer.find({
      _id: { $in: linkedCustomerIds },
    }).lean();

    res.status(200).json(linkedCustomers);
  } catch (error) {
    next(new ServerError(String(error)));
  }
}

// Search customers based on specified fields and case sensitivity
export async function searchCustomers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const searchQuery = req.query.q as string; // Get the search query from the query parameter
    const isCaseSensitive = req.query.caseSensitive === "true"; // Convert string to boolean

    if (!searchQuery) {
      return next(new BadRequestError("Please provide a query for searching"));
    }

    // Build the $or query based on the specified fields and case sensitivity
    const query = buildSearchQuery(SEARCH_FIELDS, searchQuery, isCaseSensitive);

    // Pagination
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const pageNumber = parseInt(req.query.pageNumber as string) || 1;
    const skip = (pageNumber - 1) * pageSize;

    // Sorting
    const sortField = (req.query.sortField as string) || DEFAULT_SORT_FIELD;
    const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

    // Limiting Fields
    const selectedFields =
      (req.query.fields as string)?.split(",").map((field) => field.trim()) ||
      null;

    // Get populated customers using the built query
    const customers = await getPopulatedCustomersWithOptions(
      query,
      { [sortField]: sortOrder },
      skip,
      pageSize,
      selectedFields
    );

    res.status(200).json(customers);
  } catch (error) {
    next(new ServerError(String(error)));
  }
}
