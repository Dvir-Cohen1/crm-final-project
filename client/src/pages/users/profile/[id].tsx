import React, { useEffect } from 'react'
import Layout from '@/layouts/Layout'
import { Switch, Tabs, TabsProps } from 'antd';
import Input from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { AntDesignOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import { useSelector } from 'react-redux';
import { RootState } from '@/types/global';


const Profile = () => {

     const { user } = useSelector((state: RootState) => state.auth);

     const items: TabsProps['items'] = [
          {
               key: '1',
               label: `Personal Info`,
               children: (
                    <>
                         <form >
                              <Input showLabel disabled type='text' label='ID' placeholder={user?._id} />
                              <Input showLabel type='text' label='First Name' placeholder={user?.firstName} />
                              <Input showLabel type='text' label='Last Name' placeholder={user?.lastName} />
                              <Input showLabel disabled type='text' label='Role' placeholder={user?.role} />
                              <Button type='submit' className='w-32' fontSize='sm' variant='secondary'>Save Changes</Button>
                         </form>
                    </>
               ),
          },
          {
               key: '2',
               label: `Notifications`,
               children: (
                    <>
                         <section className='flex justify-between flex-col gap-5'>
                              <div className='flex justify-between'>Mobile Notification:
                                   <Switch defaultChecked /></div>

                              <div className='flex justify-between'>Desktop Notification:
                                   <Switch defaultChecked /></div>
                              <div className='flex justify-between'>Emails Notification:
                                   <Switch defaultChecked /></div>
                         </section>
                    </>
               ),
          },
          {
               key: '3',
               label: `Privacy and Security`,
               children: `Content of Tab Pane 3`,
          },
     ];


     return (
          <Layout>
               <section className='relative mx-auto text-white w-1/2 mb-5'>
                    <div className={"bg-no-repeat bg-center flex gap-4 flex-col justify-center align-middle text-center place-items-center  bg-contain  bg-slate-400/20 p-5"}>

                         <Avatar
                              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                              icon={<AntDesignOutlined />}
                         />
                         <div className='text-slate-800 text-xl'>{user?.firstName}</div>
                         <div className='text-slate-800'>{user?.firstName}</div>
                    </div>

               <Tabs defaultActiveKey="1" items={items} />
               </section>

          </Layout>
     )
}


export default Profile


