import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { isLoginByToken } from "@/features/authentication/redux/authenticationSlice";
import store from "@/redux/store";
import { getCookie } from "@/utils/cookies";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

type AuthContextProps = {
  children?: ReactNode;
};


const AuthContext = createContext({});

export function useAuthContext() {
  return useContext(AuthContext);
}

// export const useChat = () => useContext(AuthContext);


export function AuthProvider({ children }: AuthContextProps) {

  const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
  const router = useRouter();
  const { isAuthenticated, isLoading, isRegister, isError } = store.getState().auth

  useEffect(() => {
    dispatch(isLoginByToken())
  }, [dispatch])


  useEffect(() => {
    if (isAuthenticated === false) {
      // Redirect the user to the login page if they are not authenticated
      router.replace('/authentication/login');
    }
  }, [isAuthenticated, isRegister, router])


  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
