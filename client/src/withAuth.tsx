import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import store from "./redux/store";

export const withAuth = (Component: any) => {
  const Auth = (props: any) => {
    const router = useRouter();
    const { isAuthenticated } = store.getState().auth

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/authentication/login");
      }
    }, [isAuthenticated, router]);

    return <Component {...props} />;
  };

  return Auth;
};
