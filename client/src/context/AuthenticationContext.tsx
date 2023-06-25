import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { isLoginByToken } from "@/features/authentication/redux/authenticationSlice";
import store from "@/redux/store";
import { getCookie } from "@/utils/cookies";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "@/types/global";

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
  const { isAuthenticated, isLoading, isRegister, isError } = useSelector((state: RootState) => state.auth);

  const handleIsLoginDispatch = async () => {
    await dispatch(isLoginByToken())
  }

  useEffect(() => {
    handleIsLoginDispatch()
  }, [dispatch])


  useEffect(() => {
    if (isAuthenticated === false) {
      // Redirect the user to the login page if they are not authenticated
      router.push('/authentication/login');
    }
  }, [isAuthenticated, isRegister, isError, router])


  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
