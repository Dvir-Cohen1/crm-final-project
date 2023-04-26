import Layout from '@/layouts/Layout'
import React from 'react'
import Input from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import NewUserForm from '@/features/users/components/forms/NewUserForm'
const newUser = () => {
     return (
          <Layout>
               <section className="new-user-section w-full flex flex-col items-center">
                    <NewUserForm />
               </section>
          </Layout>
     )
}

export default newUser