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
  user: UserState;
  app: AppState;
  // showMessage?: Function
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
  user?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: [];
  } | null;
}
export interface UserState {
  isLoading: boolean;
  isError: boolean | null;
  error: any;
  users?: [];
  user?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    imgSRC?: string;
    role: [string];
  } | null;
}

export type FormRegisterInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type AddUserRegisterInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: Number;
  role: [];
};

export type FormLoginInputs = {
  email: string;
  password: string;
};

type LayoutProps = {
  children?: ReactNode;
  isAuthenticated?: any;
};

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: [string];
}
