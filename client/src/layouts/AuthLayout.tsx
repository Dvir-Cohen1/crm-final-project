import React, { ReactNode, useEffect, useState } from 'react'
import AuthNavbar from './AuthNavbar'
import Image from 'next/image'
import store from '@/redux/store';
import { LayoutProps } from '@/types/global';
import { useRouter } from 'next/router';
import { getCookie } from '@/utils/cookies';
import { withAuth } from '@/withAuth';
import Link from 'next/link';

const AuthLayout = ({ children }: LayoutProps) => {
     const router = useRouter();
     const { isAuthenticated } = store.getState().auth
     useEffect(() => {
          if (isAuthenticated === true) {
               // Redirect the user to the login page if they are not authenticated
               router.replace('/');
          }
     }, [isAuthenticated])


     return (
          <section >
               <AuthNavbar />
               <main className='flex flex-col justify-center min-h-full mx-auto p-5 lg:w-1/4 lg:p-8 '>
                    {children}
               </main>
               <div className='flex justify-between items-end mt-10 h-0  absolute w-full bottom-0 '>

                    <Image width={360} height={360} src="/left.svg" alt='' />
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
                    <Image width={360} height={360} src="/right.svg" alt='' />

               </div>
          </section>
     )
}


export default AuthLayout;