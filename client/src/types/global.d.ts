import type { MenuProps } from "antd";

export type MenuItem = Required<MenuProps>["items"][number];

export interface AppState {
  // Properties related to the App state...
}

export interface RootState {
  auth: AuthState;
  app: AppState;
  // Other slices of your Redux state...
}

// Auth
export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  isLoading: boolean;
  isRegister: boolean;
  isError: boolean | null;
  error: any;
  user: object | null;
}

export type FormRegisterInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type FormLoginInputs = {
  email: string;
  password: string;
};
