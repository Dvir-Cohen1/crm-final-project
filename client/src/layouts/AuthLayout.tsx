import React, { ReactNode } from 'react'
import AuthNavbar from './AuthNavbar'
import Image from 'next/image'


type LayoutProps = {
     children: ReactNode
}

const AuthLayout = ({ children }: LayoutProps) => {
     return (
          <section >
               <AuthNavbar />
               <main className='flex flex-col justify-center min-h-full mx-auto p-5 lg:w-1/4 lg:p-8 '>
                    {children}
               </main>
               <div className='flex justify-between items-end mt-10 absolute w-full bottom-0 -z-10'>
                    <Image width={360} height={360} src="/left.svg" alt='' />
                    <div className='text-sm my-5 flex gap-4 text-gray-300'><span className='text-gray-500'>Privacy Policy</span> | <span className='text-gray-500'>Terms Of Use </span> | <span className='text-gray-500'> User Manual </span> </div>
                    <Image width={360} height={360} src="/right.svg" alt='' />
               </div>
          </section>
     )
}


export default AuthLayout

