import React, { useEffect, useState } from 'react'
import Layout from '@/layouts/Layout'
import { useDispatch } from 'react-redux'
import { allUsers, deleteUser } from '@/features/users/redux/userSlice'
import { User } from '@/types/global'
import CustomTable from '@/components/common/CustomTable'
import { Button } from '@/components/common/Button'
import AddUserModal from '@/features/users/components/AddUserModal'
import Link from 'next/link'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

const Users = () => {
     const [users, setUsers] = useState<User[]>([]);

     const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
     useEffect(() => {
          dispatch<any>(allUsers()).then((res: any) => setUsers(res.payload))
     }, [dispatch])

     const handleDelete = (userId: string) => {
          dispatch(deleteUser(userId)).then(() => {
               // After the user is deleted, fetch the updated list of users
               dispatch<any>(allUsers()).then((res: any) => setUsers(res.payload));
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
               <CustomTable data={users} dataSource={users} handleDelete={handleDelete} />
          </Layout>
     )
}

export default Users