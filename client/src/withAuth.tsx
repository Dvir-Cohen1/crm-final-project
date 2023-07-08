import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './types/global';
import { isLoginByToken } from './features/authentication/redux/authenticationSlice';

const withAuth = (WrappedComponent: any) => {
  const AuthCheck = (props: any) => {
    const router = useRouter();
    const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

    const { isAuthenticated, isLoading, isRegister, isError } = useSelector((state: RootState) => state.auth);
    useEffect(() => {
      // Retrieve the JWT from local storage or cookie
      // const token = localStorage.getItem('ac-token');
      const dipsatchIsLogin = async () => { await dispatch(isLoginByToken()) }
      dipsatchIsLogin()
      console.log("first")
      // If the token is missing, redirect to the login page
      if (!isAuthenticated) {
        router.push('/authentication/login');
      }
    }, [isAuthenticated, router]);

    return <WrappedComponent {...props} />;
  };

  return AuthCheck;
};

export default withAuth;
