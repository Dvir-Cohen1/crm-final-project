import Layout from '@/layouts/Layout'
import React, { useCallback, useEffect } from 'react'
import Input from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import NewUserForm from '@/features/users/components/forms/NewUserForm'
import { RootState } from '@/types/global'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import { message } from 'antd'
import router from 'next/router'
const NewUser = () => {
     const { isLoading, isError, error } = useSelector((state: RootState) => state.user || {});

     const showMessage = useCallback((msg?: string) => {

          switch (isError) {
               case true:
                    message.error(error);
                    break;
               case false:
                    message.success(error || "Success");
                    setTimeout(() => {

                         router.push('/users')
                    }, 1000);
                    break;

               default:
                    break;
          }

     }, [isError, error]);

     useEffect(() => {

          if (isLoading) {
               message.loading("Loading...");
          } else {
               message.destroy();
               showMessage();
          }

     }, [isLoading, isError]);

     return (
          <>
               <Head>
                    <title>New User</title>
               </Head>
               <Layout>
                    <section className="new-user-section w-full flex flex-col items-center">
                         <NewUserForm />
                    </section>
               </Layout>
          </>
     )
}

export default NewUser