import React, { useEffect, useState } from 'react'
import Layout from '@/layouts/Layout'
import { useDispatch } from 'react-redux'
import { allUsers, deleteUser } from '@/features/users/redux/userSlice'
import { IUser } from '@/types/global'
import CustomTable from '@/components/common/CustomTable'
import { Button } from '@/components/common/Button'
import Link from 'next/link'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

const Users = () => {
     const [users, setUsers] = useState<IUser[]>([]);

     const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
     useEffect(() => {
          // dispatch the list of users from redux & set local users state
          dispatch<any>(allUsers()).then((res: any) => setUsers(res.payload))
     }, [dispatch])

     // DELETE USER
     const handleDeleteUser = (userId: string) => {
          dispatch(deleteUser(userId)).then(() => {
               // After the user is deleted, dispatch the updated list of users
               dispatch<any>(allUsers()).then((res: { payload: [] }) => setUsers(res.payload));
          });
     };

     useEffect(() => {
          // Listen for changes to the `users` state variable and update the table
          // Note that this will only run when the `users` variable changes
     }, [users]);


     return (
          <Layout>
               <div className='flex justify-between place-items-center mb-5'>
                    <div className='text-3xl font-semibold'>Users</div>
                    <div><Link href={'/users/newUser'}><Button className='px-5' fontSize='sm' >New</Button></Link></div>
               </div>
               <CustomTable data={users} dataSource={users} handleDeleteUser={handleDeleteUser} />
          </Layout>
     )
}

export default Users