import React from 'react';
import Layout from '@/layouts/Layout'
import PageTitle from '@/components/common/PageTitle'
import NewCustomerForm from '@/features/customers/components/forms/NewCustomerForm'
import NewCustomerTabs from '@/features/customers/components/NewCustomerTabs';

const NewCustomer = () => {
  return (
    <Layout>
      <PageTitle showNewButton={false} title={'New Customer'} />
      {/* <NewCustomerTabs /> */}
      <NewCustomerForm />
    </Layout>
  )
}

export default NewCustomer