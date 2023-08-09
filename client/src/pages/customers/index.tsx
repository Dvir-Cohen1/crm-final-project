import PageTitle from '@/components/common/PageTitle'
import CustomerTable from '@/features/customers/components/CustomerTable'
import Layout from '@/layouts/Layout'
import { Button, Space } from 'antd'
import React from 'react'

const Customers = () => {

     return (
          <Layout>
               <PageTitle title={'Customers'}
                    showNewButton={false}
                    // actionsButtons={
                    //      <Space style={{ marginBottom: 16 }}>
                    //           <Button >Sort Name</Button>
                    //           <Button >Clear filters</Button>
                    //           <Button >Clear filters and sorters</Button>
                    //      </Space>
                    // }
               />
               <CustomerTable />
          </Layout>
     )
}

export default Customers