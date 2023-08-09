import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  FormRegisterInputs,
  FormLoginInputs,
  AuthState,
  CustomerState,
} from "@/types/global";

import router from "next/router";
import { getAllCustomersApi } from "../services/customers.service";

export const getAllCustomers = createAsyncThunk(
  "customers/getAllCustomers",
  async () => {
    const data = await getAllCustomersApi();
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
      });
  },
});

// export const { cleanStates, resetErrors } = customersSlice.actions;
export default customerSlice.reducer;
