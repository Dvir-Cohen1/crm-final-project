import React, { useEffect, useState } from 'react'
import AuthNavbar from './AuthNavbar'
import Image from 'next/image'
import { LayoutProps, RootState } from '@/types/global';
import Link from 'next/link';
import useAuthChecking from '@/hooks/useAuthChecking';
import { AUTH_LAYOUT_FOOTER_LINKS } from '@/features/authentication/constants/links';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const AuthLayout = ({ children }: LayoutProps) => {

     // useAuthChecking();
     const { isAuthenticated } = useSelector((state: RootState) => state.auth);
     const router = useRouter();
     if (isAuthenticated) {
          router.push('/');
          return null
     }

     return (
          <section >
               <AuthNavbar />
               <main className='flex flex-col justify-center min-h-full mx-auto p-5 lg:w-1/4 lg:p-8 '>
                    {children}
               </main>
               <footer className='hidden md:flex justify-between items-end mt-10 h-0  absolute w-full bottom-0 '>

                    <Image width={360} height={360} src="/left.svg" alt='' />
                    <div className='text-sm my-5 flex gap-4 text-gray-300'>
                         {AUTH_LAYOUT_FOOTER_LINKS?.map((item, indexId) => {
                              return (
                                   <span key={indexId}>
                                        <Link className='text-gray-500' href={"/"}>
                                             <span className='text-gray-500'>{item.label}</span>
                                        </Link>
                                        {indexId !== 2 && "|"}
                                   </span>
                              )
                         })}
                    </div>
                    <Image className='hidden md:block' width={360} height={360} src="/right.svg" alt='' />
               </footer>
          </section>
     )
}

export default AuthLayout;