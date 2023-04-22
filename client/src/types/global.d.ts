import type { MenuProps } from "antd";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
export type MenuItem = Required<MenuProps>["items"][number];

// Redux asyncThunk
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;
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
  isAuthenticated: boolean | null;
  token?: string | null;
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

type LayoutProps = {
  children?: ReactNode;
  isAuthenticated?: any;
};
