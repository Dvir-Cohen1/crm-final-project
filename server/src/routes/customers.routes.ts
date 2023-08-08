import { Router } from "express";
// import {
//   createCustomer,
//   deleteCustomer,
//   getAllCustomers,
//   getCustomerById,
//   updateCustomer,
// } from "../controllers/customers.controller";
import {
  createCustomer,
  deleteCustomer,
  findLinkedCustomers,
  getAllCustomers,
  getCustomerById,
  linkCustomers,
  updateCustomer,
} from "../controllers/customers.controller.js";

const router = Router();

// GET all customers
router.get("/", getAllCustomers);

// GET a single customer by ID
router.get("/:customerId", getCustomerById);

// POST create a new customer
router.post("/", createCustomer);

// PUT update a customer by ID
router.put("/:customerId", updateCustomer);

// DELETE a customer by ID
router.delete("/:customerId", deleteCustomer);

// Link customers together
router.post("/link", linkCustomers);

// Find linked customers for a given customer
router.get("/:customerId/linked", findLinkedCustomers);

export default router;
