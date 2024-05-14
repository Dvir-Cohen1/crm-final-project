import {
  DEFAULT_SORT_FIELD,
  SEARCH_FIELDS,
  SELECT_CUSTOMER_FIELDS,
} from "../config/constants/customer.constant.js";
import { SELECTED_USER_FIELDS } from "../config/constants/user.constants.js";
import { buildSearchQuery } from "../helpers/customers.helper.js";
import Customer from "../models/customers/customer.model.js";
import { ICustomer } from "../types/global.js";

export async function getPopulatedCustomers(options = {}) {
  const customers: ICustomer[] = await Customer.find({}, null, options)
    .populate("users", SELECTED_USER_FIELDS) // Populate 'users'
    .populate("tasks") // Populate 'tasks'
    .populate("linkedCustomers", SELECT_CUSTOMER_FIELDS) // Populate 'linkedCustomers'
    .lean();

  if (!customers || !customers?.length) {
    return null;
  }
  return customers;
}

export async function getPopulatedCustomerById(customerId: string) {
  const customer = await Customer.findById(customerId)
    .populate("users", SELECTED_USER_FIELDS) // Populate 'users'
    .populate("tasks") // Populate 'tasks'
    // .populate("projects", "name company") // Populate 'projects'
    .populate("linkedCustomers", SELECT_CUSTOMER_FIELDS) // Populate 'linkedCustomers' with only 'name' and 'email' fields
    .lean();

  if (!customer) {
    return null;
  }
  return customer;
}


// Use Mongoose to search for customers using the built query and return populated fields
export async function getPopulatedCustomersWithOptions(
  query: Record<string, any>,
  // options: Record<string, any>,
  sortOptions: {},
  skip: number,
  pageSize: number,
  selectedFields: string[]
) {
  const customers: ICustomer[] = await Customer.find(query, null)
    .select(selectedFields)
    .populate("users", SELECTED_USER_FIELDS) // Populate 'users'
    .populate("tasks") // Populate 'tasks'
    .populate("linkedCustomers", SELECT_CUSTOMER_FIELDS) // Populate 'linkedCustomers'
    .lean()
    .sort(sortOptions)
    .skip(skip)
    .limit(pageSize)
    .exec();

  return customers;
}
