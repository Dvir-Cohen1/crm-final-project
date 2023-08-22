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
import { useRouter } from 'next/router';

const Layout = ({ children, showBreadCrumbs = true }: any) => {
     // const { isLoading: isLoadingTask } = useSelector((state: RootState) => state.task);
     const isLoading = useLoader(300);
     const router = useRouter();
     // useAuthChecking();
     const { isAuthenticated } = useSelector((state: RootState) => state.auth);

     if (!isAuthenticated) {
          router.push('/authentication/login');
          return null
     }

     return (
          <div className='min-h-full'>
               <Navbar />
               <section className='flex content-container'>
                    <Sidebar />
                    <main className="w-full px-4 lg:px-20 lg:py-2 flex flex-col">
                         {showBreadCrumbs && <Breadcrumbs />}
                         {isLoading ? <SkeletonLoader isLoading={isLoading} /> : children}
                         <Footer />
                    </main>
               </section>
          </div>
     );
};

export default Layout;