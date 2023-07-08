import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '@/types/global';

const useAuthChecking = () => {
     const [isCheckingAuth, setIsCheckingAuth] = useState(true);
     const { isAuthenticated } = useSelector((state: RootState) => state.auth);
     const router = useRouter();

     useEffect(() => {
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
