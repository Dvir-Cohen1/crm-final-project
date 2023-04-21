import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { register, login } from "../services/authentication.service";
import { FormRegisterInputs, FormLoginInputs } from "@/types/global";
import { AuthState } from "@/types/global";

export const registerByPayload = createAsyncThunk(
  "register/registerByPayload",
  async (values: FormRegisterInputs) => {
    const data = await register(values);
    return data;
  }
);

export const loginByPayload = createAsyncThunk(
  "login/loginByPayload",
  async (values: FormLoginInputs) => {
    const data = await login(values);
    return data;
  }
);

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  isLoading: false,
  isRegister: false,
  isError: null,
  error: "",
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // register: (state, action: PayloadAction<string>) => {
    //   state.isAuthenticated = true;
    // },
    // login: (state, action: PayloadAction<string>) => {
    //   state.isAuthenticated = true;
    //   state.token = action.payload;
    // },
    // logout: (state) => {
    //   state.isAuthenticated = false;
    //   state.token = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      //
      // Register
      //
      .addCase(registerByPayload.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerByPayload.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.isError = true;
      })
      .addCase(registerByPayload.fulfilled, (state, { payload }: any) => {
        state.isLoading = false;
        state.error = "";
        state.isError = false;
        state.user = payload.data;
      })
      //
      // Login
      //
      .addCase(loginByPayload.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
        state.isError = false;
      })
      .addCase(loginByPayload.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.isError = true;
      })
      .addCase(loginByPayload.fulfilled, (state, { payload }: any) => {
        state.isLoading = false;
        state.error = "";
        state.isError = false;
        state.user = payload.data;
        state.isAuthenticated = true;
      });
  },
});

// export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
