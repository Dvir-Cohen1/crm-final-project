import React, { ReactNode, Suspense, useEffect, useState } from 'react'
import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar';
import useLoader from "@/hooks/useLoader";
import SkeletonLoader from '@/components/common/SkeletonLoader';
import { LayoutProps } from '@/types/global';
import { AuthProvider } from '@/context/AuthenticationContext';
import Breadcrumbs from '@/components/common/Breadcrumbs';



const Layout = ({ children }: LayoutProps) => {
     const isLoading = useLoader()

     return (
          <>
               <AuthProvider>
                    <Navbar />
                    <div className='mt-1 flex'>
                         <Sidebar />
                         <main className="w-full px-4 lg:px-20 lg:py-2  flex flex-col">
                              <Breadcrumbs />
                              {isLoading ? <SkeletonLoader isLoading={isLoading} /> : children}
                         </main>
                    </div>
               </AuthProvider>
          </>
     );
};



export default Layout;