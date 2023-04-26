import React, { useEffect, useState } from 'react'
import Layout from '@/layouts/Layout'
import { useDispatch } from 'react-redux'
import { allUsers } from '@/features/users/redux/userSlice'
import { User } from '@/types/global'
import CustomTable from '@/components/common/CustomTable'
import { Button } from '@/components/common/Button'


const Users = () => {
     const [users, setUsers] = useState<User[]>([]);

     // const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
     const dispatch = useDispatch()
     useEffect(() => {
          dispatch<any>(allUsers()).then((res: any) => setUsers(res.payload))

     }, [dispatch])


     return (
          <Layout>
               <div className='flex justify-between place-items-center mb-5'>

                    <div className='text-3xl font-semibold'>Users</div>
                    <div><Button className='px-5' fontSize='sm' label='New' /></div>
               </div>
               <CustomTable data={users} dataSource={users} />


               {/* {users.length > 0 && users.map((item, indexId) => {
                    return (
                         <div key={indexId}>
                              <div >{item.firstName} {item.lastName}</div>
                              <div >{item.email} {item.role[0]}</div>
                              <br />
                         </div>
                    )
               })} */}


          </Layout>
     )
}

export default Users