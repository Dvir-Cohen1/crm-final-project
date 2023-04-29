import React, { useEffect, useState } from 'react'
import Layout from '@/layouts/Layout'
import { AntDesignOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById, uploadProfileImage } from '@/features/users/redux/userSlice';
import { Avatar, Switch, Tabs, TabsProps } from 'antd';
import Input from '@/components/common/Input';
import { RootState } from '@/types/global';
import { message } from 'antd';
import { Button } from '@/components/common/Button';
// import { uploadProfileImageApi } from '@/features/users/services/users.service';


const User = () => {
     const router = useRouter();
     const { id }: any = router.query;
     const loggedUser = useSelector((state: RootState) => state.auth.user);
     const user = useSelector((state: RootState) => state.user.user);
     const { isLoading, isError, error } = useSelector((state: RootState) => state.user);
     const dispatch = useDispatch()

     const isAdmin = (user: any) => {
          if (user) {
               return user.role === "admin" ? true : false
          }
          return false
     }

     const isUserCanEdit = (user: any, loggedUser: any) => {
          console.log(loggedUser, "loggedUser")
          console.log(user, "user")
          if (!user || !loggedUser) return false

          if (loggedUser.role === "admin" || loggedUser._id == user._id) {
               return true
          }
          return false


     }

     useEffect(() => {
          dispatch<any>(getUserById(id))
     }, [dispatch, id])

     const items: TabsProps['items'] = [
          {
               key: '1',
               label: `Personal Info`,
               children: (
                    <>
                         <form >
                              <Input showLabel disabled type='text' label='ID' placeholder={user?._id} />
                              <Input showLabel disabled={!isUserCanEdit(user, loggedUser)} type='text' label='First Name' placeholder={user?.firstName} />
                              <Input showLabel disabled={!isUserCanEdit(user, loggedUser)} type='text' label='Last Name' placeholder={user?.lastName} />
                              <Input showLabel disabled={!isUserCanEdit(user, loggedUser)} type='email' label='Email' placeholder={user?.email} />
                              <Input showLabel disabled={!isUserCanEdit(user, loggedUser)} type='number' label='Phone Number' placeholder={user?.phoneNumber?.toString() || ""} />
                              <Input showLabel disabled={loggedUser?.role !== "admin"} type='text' label='Role' placeholder={user?.role} />

                              {isUserCanEdit(user, loggedUser) &&
                                   <Button type='submit' className='w-32' fontSize='sm' variant='secondary'>Save Changes</Button>
                              }
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

     const [file, setFile] = useState<any>(null);
     function handleFileChange(event: any) {
          setFile(event.target.files[0]);
     }

     async function handleSubmit(event: any) {
          message.loading("Loading...");
          event.preventDefault();
          const formData = new FormData();
          formData.append('profileImage', file, file.name);
          await dispatch<any>(uploadProfileImage({ file, userId: user?._id }))
          // message.destroy()
     }

     useEffect(() => {

          switch (isError) {
               case true:
                    message.destroy()
                    message.error(error);
                    break;
               case false:
                    message.destroy()
                    message.success(error || "Success");
                    break;

               default:
                    break;
          }

          return () => {
               message.destroy()
          }

     }, [error, isError, isLoading])

     return (
          <Layout>
               <section className='relative mx-auto text-white w-1/2 mb-5'>
                    <div className={"bg-no-repeat bg-center flex gap-4 flex-col justify-center align-middle text-center place-items-center  bg-contain  bg-slate-400/20 p-5"}>
                         <form onSubmit={handleSubmit}>
                              <input required type="file" onChange={handleFileChange} />
                              <button type="submit">Upload</button>
                         </form>
                         <Avatar
                              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                              icon={<AntDesignOutlined />}
                              src={user?.imgSRC}
                         />
                         <div className='text-slate-800 text-xl'>{user?.firstName}</div>
                         <div className='text-slate-800'>{user?.firstName}</div>
                    </div>

                    <Tabs defaultActiveKey="1" items={items} />
               </section>
          </Layout>
     )
}

export default User