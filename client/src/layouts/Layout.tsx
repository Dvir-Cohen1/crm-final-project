import React, { ReactNode, Suspense, useEffect, useState } from 'react'
import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar';
import useLoader from "@/hooks/useLoader";
import SkeletonLoader from '@/components/common/SkeletonLoader';
import { AuthState, LayoutProps, RootState } from '@/types/global';
import { AuthProvider } from '@/context/AuthenticationContext';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Footer from './Footer/Footer';
import withAuth from '@/withAuth';
import store from '@/redux/store';
import { isLoginByToken } from '@/features/authentication/redux/authenticationSlice';
import { useDispatch, useSelector } from 'react-redux';
import router, { useRouter } from 'next/router';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';



const Layout = ({ children }: LayoutProps) => {
     const isLoading = useLoader(300);
     const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
     const { isAuthenticated }: AuthState = useSelector((state: RootState) => state.auth);

     const handleDispatch = async () => {
          await dispatch(isLoginByToken())
          // await dispatch(isLoginByToken())
        };
     // const router = useRouter();
     // const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

     // useEffect(() => {
     //      if (!isAuthenticated) {
     //        router.push('/authentication/login'); // Redirect to the login page if not authenticated
     //      }
     //    }, [isAuthenticated, router]);

     //    if (!isAuthenticated) {
     //      return null; // Render nothing if not authenticated
     //    }

     useEffect(()=>{
          handleDispatch()
          if (!isAuthenticated) {
            router.push('/authentication/login'); // Redirect to the login page if not authenticated
          }

     },[])


     return (
          <>
               <Navbar />
               <div className='mt-1 flex'>
                    <Sidebar />
                    <main className="w-full px-4 lg:px-20 lg:py-2 flex flex-col">
                         <Breadcrumbs />
                         {isLoading ? <SkeletonLoader isLoading={isLoading} /> : children}
                         <Footer />
                    </main>
               </div>
          </>
     );
};

// export const getServerSideProps = async ({ req, res }: any) => {
//      // Check if the user is authenticated
//      await store.dispatch(isLoginByToken());

//      const isAuthenticated = store.getState().auth.isAuthenticated
//      console.log(isAuthenticated)
//      if (!isAuthenticated) {
//           res.writeHead(302, { Location: '/authentication/login' }); // Redirect to the login page
//           res.end();
//           return { props: {} };
//      }

//      // Fetch data from your Redux store and dispatch actions if necessary

//      // Return the props that will be passed to the page component
//      return {
//           props: {},
//      };
// };

export default Layout;