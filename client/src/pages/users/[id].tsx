import React, { useEffect, useState } from 'react'
import Layout from '@/layouts/Layout'
import { AntDesignOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProfileImage, getUserById, uploadProfileImage } from '@/features/users/redux/userSlice';
import { Avatar, Switch, Tabs, TabsProps } from 'antd';
import { RootState } from '@/types/global';
import { message, Tooltip } from 'antd';
import EditUserForm from '@/features/users/components/forms/EditUserForm';

const User = () => {
     const router = useRouter();
     const { id }: any = router.query;
     const loggedUser = useSelector((state: RootState) => state.auth.user);
     const user = useSelector((state: RootState) => state.user.user);
     const { isLoading, isError, error } = useSelector((state: RootState) => state.user);
     const dispatch = useDispatch()

     useEffect(() => {
          dispatch<any>(getUserById(id))
     }, [dispatch, id])

     const items: TabsProps['items'] = [
          {
               key: '1',
               label: `Personal Info`,
               children: (
                    <>
                         <EditUserForm user={user} loggedUser={loggedUser} />
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
     }
     async function handledeleteProfileImage() {
          dispatch<any>(deleteProfileImage({ userId: user?._id }))
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
               {console.log(user?.imgSRC)}
               <section className='relative mx-auto text-white w-full lg:w-1/2 mb-5'>
                    <div className={"bg-no-repeat bg-center flex gap-4 flex-col justify-center align-middle text-center place-items-center  bg-contain  bg-slate-400/20 p-5"}>
                         {user?.imgSRC ?
                              <>
                                   <Avatar
                                        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                                        icon={<AntDesignOutlined />}
                                        src={user?.imgSRC}
                                   />
                                   <Tooltip placement='bottom' arrow={false} title="delete profile image">
                                        <button onClick={handledeleteProfileImage} className='absolute  text-black/50 hover:text-black p-2'><CloseCircleOutlined /></button>
                                   </Tooltip>
                              </>
                              :
                              <>
                                   {/* <UploadFileAvatar/> */}
                                   <Avatar
                                        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                                        icon={<AntDesignOutlined />}
                                   />
                                   <form className='text-black' onSubmit={handleSubmit}>
                                        <input required type="file" onChange={handleFileChange} />
                                        <button type="submit">Upload</button>
                                   </form>
                              </>
                         }

                         <div className='text-slate-800 text-xl'>{user?.firstName}</div>
                         <div className='text-slate-800'>{user?.firstName}</div>
                    </div>

                    <Tabs defaultActiveKey="1" items={items} />
               </section>
          </Layout>
     )
}

export default User