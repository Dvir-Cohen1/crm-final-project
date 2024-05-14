import React, { useEffect } from 'react'
import Layout from '@/layouts/Layout'
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomer } from '@/features/customers/redux/customerSlice';
import router from 'next/router';
import { RootState } from '@/types/global';
import { AntDesignOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import CustomerTabs from '@/features/customers/components/CustomerTabs';


const Customer = () => {
     const { id }: any = router.query;
     const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
     const { customer }: any = useSelector((state: RootState) => state.customer);

     useEffect(() => {
          // dispatch the list of users from redux & set local users state
          dispatch(getCustomer(id))
     }, [id])


     const mailButtonHref = `mailto:${customer.email}?subject=Feedback&body=Message`
     const avatarSizes = { xs: 24, sm: 32, md: 40, lg: 64, xl: 64, xxl: 80 }

     return (
          <Layout>
               <div className="flex flex-col">
                    <div className="flex items-center gap-4 mb-5">
                         <Avatar size={avatarSizes} icon={<AntDesignOutlined />} />
                         <div>
                              <h1 className='text-xl mb-0'>{customer.companyName}</h1>
                              <h2 className='font-normal text-sm'><a href={mailButtonHref}>{customer.email}</a></h2>
                         </div>
                    </div>
                    <CustomerTabs customer={customer} />
               </div>
          </Layout>
     )
}

export default Customer