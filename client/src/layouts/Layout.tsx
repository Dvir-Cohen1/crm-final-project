import React, { useEffect, useState } from 'react'
import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar';
import useLoader from "@/hooks/useLoader";
import SkeletonLoader from '@/components/common/SkeletonLoader';
import { AuthState, LayoutProps, RootState } from '@/types/global';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Footer from './Footer/Footer';
import { useSelector } from 'react-redux';
import router from 'next/router';
import useAuthChecking from '@/hooks/useAuthChecking';

const Layout = ({ children }: LayoutProps) => {
     const isLoading = useLoader(300);
     
     const isCheckingAuth = useAuthChecking();

     if (isCheckingAuth) {
       return null; // Render nothing while checking authentication
     }

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


export default Layout;