import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CustomerState } from "@/types/global";

import {
  getAllCustomersApi,
  searchCustomersApi,
} from "../services/customers.service";

export const getAllCustomers = createAsyncThunk(
  "customers/getAllCustomers",
  async () => {
    const data = await getAllCustomersApi();
    return data;
  }
);
export const searchCustomers = createAsyncThunk(
  "customers/searchCustomers",
  async (keywords: string) => {
    const data = await searchCustomersApi(keywords);
    return data;
  }
);

const initialState: CustomerState = {
  isLoading: false,
  isError: null,
  error: "",
  customer: {},
  customers: [],
};

export const customerSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle getAllCustomers
      .addCase(getAllCustomers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = String(action.error.message);
        state.isError = true;
      })
      .addCase(getAllCustomers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = "";
        state.isError = false;
        state.customers = payload;
      })
      // Handle search customers
      .addCase(searchCustomers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(searchCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = String(action.error.message);
        state.isError = true;
      })
      .addCase(searchCustomers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = "";
        state.isError = false;
        state.customers = payload;
      })
  },
});

// export const { cleanStates, resetErrors } = customersSlice.actions;
export default customerSlice.reducer;
