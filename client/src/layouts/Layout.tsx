import React, { ReactNode, Suspense } from 'react'
import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar';
import useLoader from "@/hooks/useLoader";
import SkeletonLoader from '@/components/common/SkeletonLoader';
import { useRouter } from 'next/router';
import store from '@/redux/store';


type LayoutProps = {
     children: ReactNode
}


const Layout = ({ children }: LayoutProps) => {
     const router = useRouter();
     const isLoading = useLoader()
     const { isAuthenticated } = store.getState().auth

     if (!isAuthenticated) {
          // Redirect the user to the login page if they are not authenticated
          router.replace('/authentication/login');
          return null;
     }
     return (
          <>
               <Navbar />
               <div className='mt-1 flex'>
                    <Sidebar />
                    <main className="w-full py-10 px-20 flex flex-col items-center">

                         {isLoading ? <SkeletonLoader isLoading={isLoading} /> : children}
                    </main>
               </div>
          </>
     );
};
export default Layout;