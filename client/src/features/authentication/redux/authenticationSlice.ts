import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FormRegisterInputs, FormLoginInputs, AuthState } from "@/types/global";
import { getCookie, removeCookie, setCookie } from "@/utils/cookies";
import {
  register,
  login,
  isLogin,
  logout,
} from "../services/authentication.service";
import router from "next/router";

export const registerByPayload = createAsyncThunk(
  "authentication/registerByPayload",
  async (values: FormRegisterInputs) => {
    const data = await register(values);
    return data;
  }
);

export const loginByPayload = createAsyncThunk(
  "authentication/loginByPayload",
  async (values: FormLoginInputs) => {
    const data = await login(values);
    return data;
  }
);

export const isLoginByToken = createAsyncThunk(
  "auth/isLoginByToken",
  async () => {
    const data = await isLogin();
    return data;
  }
);

export const logoutByToken = createAsyncThunk(
  "auth/logoutByToken",
  async (values: any) => {
    const data = await logout(values);
    return data;
  }
);

const initialState: AuthState = {
  isAuthenticated: false,
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
    resetErrors: (state) => {
      setTimeout(() => {
        state.isError = null;
        state.error = "";
      }, 4000);
    },
    setIsLogin: (state, { payload }) => {
      state.isAuthenticated = payload.isAuthenticated;
    },
    cleanStates: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.isRegister = false;
      state.isError = null;
      state.error = "";
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle Register
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
      })
      // Handle Login
      .addCase(loginByPayload.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
        state.isError = null;
      })
      .addCase(loginByPayload.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.isError = true;
      })
      .addCase(loginByPayload.fulfilled, (state, { payload }: any) => {
        state.isLoading = false;
        state.isRegister = true;
        state.error = "";
        state.isError = false;
        state.user = payload.data;
        state.isAuthenticated = true;
      })
      // Handle isLogin?
      .addCase(isLoginByToken.pending, (state, action) => {
        // state.isLoading = true;
        state.isError = null;
        state.error = "";
      })
      .addCase(isLoginByToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(isLoginByToken.fulfilled, (state, { payload }: any) => {
        state.isAuthenticated = payload.isAuthenticated;
        state.isLoading = false;
        state.isError = null;
        state.error = "";
        state.user = payload.user;
      })
      // Handle logout
      .addCase(logoutByToken.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logoutByToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.user = null;
        state.isAuthenticated = false;
        removeCookie("ac-token", { path: "/" });
      })
      .addCase(logoutByToken.fulfilled, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = false;
        state.isRegister = false;
        state.isAuthenticated = false;
        state.error = "You have been logged out!";
        state.user = null;
        removeCookie("ac-token", { path: "/" });
      });
  },
});
export const { cleanStates, resetErrors } = authSlice.actions;
export default authSlice.reducer;
