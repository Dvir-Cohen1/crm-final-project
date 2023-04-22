import React, { ReactNode, Suspense, useEffect, useState } from 'react'
import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar';
import useLoader from "@/hooks/useLoader";
import SkeletonLoader from '@/components/common/SkeletonLoader';
import { useRouter } from 'next/router';
import store from '@/redux/store';
import { LayoutProps } from '@/types/global';
import { withAuth } from '@/withAuth';
import { getCookie } from '@/utils/cookies';

import { AuthProvider } from '@/context/AuthenticationContext';

const Layout = ({ children }: LayoutProps) => {
     const isLoading = useLoader()

     // const isAcCookie = getCookie("ac-token") ? true : false
     // const [isLoggedIn, setisLoggedIn] = useState(isAcCookie)


     // const router = useRouter();
     // const { isAuthenticated } = store.getState().auth


     // useEffect(() => {
     //      if (!isLoggedIn) {
     //           // Redirect the user to the login page if they are not authenticated
     //           router.replace('/authentication/login');
     //      }
     // }, [isAuthenticated])





     return (
          <>
               <AuthProvider>

                    <Navbar />
                    <div className='mt-1 flex'>
                         <Sidebar />
                         <main className="w-full py-10 px-20 flex flex-col items-center">

                              {isLoading ? <SkeletonLoader isLoading={isLoading} /> : children}
                         </main>
                    </div>
               </AuthProvider>
          </>
     );
};



export default Layout;