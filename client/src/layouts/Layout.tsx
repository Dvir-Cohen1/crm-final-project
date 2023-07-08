import React from 'react'
import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar';
import useLoader from "@/hooks/useLoader";
import SkeletonLoader from '@/components/common/SkeletonLoader';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Footer from './Footer/Footer';
import useAuthChecking from '@/hooks/useAuthChecking';
import { useSelector } from 'react-redux';
import { RootState } from '@/types/global';

const Layout = ({ children }: any) => {
     const isLoading = useLoader(300);

     useAuthChecking();
     const { isAuthenticated } = useSelector((state: RootState) => state.auth);

     if (!isAuthenticated) {
          return null
     }

     return (
          <body>
               <Navbar />
               <section className='mt-1 flex'>
                    <Sidebar />
                    <main className="w-full px-4 lg:px-20 lg:py-2 flex flex-col">
                         <Breadcrumbs />
                         {isLoading ? <SkeletonLoader isLoading={isLoading} /> : children}
                         <Footer />
                    </main>
               </section>
          </body>
     );
};

export default Layout;