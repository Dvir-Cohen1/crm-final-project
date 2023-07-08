import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '@/types/global';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { isLoginByToken } from '@/features/authentication/redux/authenticationSlice';
import { message } from 'antd';

const useAuthChecking = () => {
     const [isCheckingAuth, setIsCheckingAuth] = useState(true);
     const { isAuthenticated } = useSelector((state: RootState) => state.auth);
     const router = useRouter();
     const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

     useEffect(() => {

          dispatch(isLoginByToken())

          if (isAuthenticated && router.asPath.includes("authentication")) {
               router.replace('/'); // Redirect to the login page if not authenticated
          } else if (!isAuthenticated && !router.asPath.includes("authentication")) {
               router.replace('/authentication/login'); // Redirect to the login page if not authenticated
          } else {
               setIsCheckingAuth(false);
          }


     }, [isAuthenticated]);

     return isCheckingAuth;
};

export default useAuthChecking;
