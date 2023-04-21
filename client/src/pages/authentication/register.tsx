import React from 'react'
import AuthLayout from '@/layouts/AuthLayout'
import Link from '@/components/common/Link'
import { Button } from '@/components/common/Button'
import SeporatorWrapper from '@/components/common/SeporatorWrapper'
import Image from 'next/image'
import RegistrationForm from '@/features/authentication/components/RegistrationForm'


const Register = () => {
     return (
          <AuthLayout>
               <div className=' text-[#333333]'>
                    <RegistrationForm />
                    <SeporatorWrapper title='OR CONNECT WITH' />
                    <Button variant='default' fontSize='sm' label='Google' ><Image width={15} height={15} src='https://cdn.monday.com/images/logo_google_v2.svg' alt='asd' /></Button>

                    <p className='text-center text-sm mt-8 mb-2'> already have an account? <Link label='Sign in' href='/authentication/login' /></p>
                    <p className='text-center text-sm'> Having trouble to register? <Link label=' Contact Us' href='/' /></p>
                    {/* <button onClick={onSubmitRegister}>test register</button> */}
               </div>

          </AuthLayout>
     )
}

export default Register