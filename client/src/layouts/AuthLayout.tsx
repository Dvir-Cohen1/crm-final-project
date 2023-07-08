import React, { useEffect } from 'react'
import AuthNavbar from './AuthNavbar'
import Image from 'next/image'
import store from '@/redux/store';
import { LayoutProps } from '@/types/global';
import { useRouter } from 'next/router';

import Link from 'next/link';
import { isLoginByToken } from '@/features/authentication/redux/authenticationSlice';

const AuthLayout = ({ children }: LayoutProps) => {

     // const router = useRouter();
     // const { isAuthenticated } = store.getState().auth

     // Redirect the user to home page if authenticated
     // useEffect(() => {
     //      if (isAuthenticated === true) {
     //           router.replace('/');
     //      }
     // }, [isAuthenticated])


     return (
          <section >
               <AuthNavbar />
               <main className='flex flex-col justify-center min-h-full mx-auto p-5 lg:w-1/4 lg:p-8 '>
                    {children}
               </main>
               <div className='hidden md:flex justify-between items-end mt-10 h-0  absolute w-full bottom-0 '>

                    <Image className='' width={360} height={360} src="/left.svg" alt='' />
                    <div className='text-sm my-5 flex gap-4 text-gray-300'>
                         <Link className='text-gray-500' href={"/"}>
                              <span className='text-gray-500'>Privacy Policy</span>
                         </Link>
                         |
                         <Link href={"/"}>
                              <span className='text-gray-500'>Terms Of Use </span>
                         </Link>
                         |
                         <Link href={"/"}>
                              <span className='text-gray-500'> User Manual </span>
                         </Link>
                    </div>
                    <Image className='hidden md:block' width={360} height={360} src="/right.svg" alt='' />

               </div>
          </section>
     )
}


export const getServerSideProps = async ({ req, res }: any) => {
     // Check if the user is authenticated
     await store.dispatch(isLoginByToken());

     const isAuthenticated = store.getState().auth
     console.log(isAuthenticated)
     if (isAuthenticated) {
          res.writeHead(302, { Location: '/' }); // Redirect to the login page
          res.end();
          return { props: {} };
     }

     // Fetch data from your Redux store and dispatch actions if necessary

     // Return the props that will be passed to the page component
     return {
          props: {},
     };
};

export default AuthLayout;