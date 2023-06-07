import { allUsers } from '@/features/users/redux/userSlice';
import { IUser, RootState } from '@/types/global';
import { Avatar, Form, Select } from 'antd'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { UserOutlined } from '@ant-design/icons';
const { Option } = Select;

const EditAssigneeSelect = ({ assignee, handleEditTask }: { assignee: any, handleEditTask: Function }) => {

     const usersState = useSelector((state: RootState) => state.user.users);

     const [users, setUsers] = useState<IUser[]>(usersState || []);
     const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
     // dispatch users for assignee options
     useEffect(() => {
          dispatch<any>(allUsers()).then((res: any) => setUsers(res.payload))
     }, [dispatch])

     const avatarSize = 25;

     const onChange = async (e: any) => {
          console.log(e)
          const response = await handleEditTask(e, false, true)
          console.log(response)
     };

     return (
          <div className='edit-task-select'>
               <Select onChange={onChange} className='edit-task-select' defaultValue={assignee[0]._id} placeholder="Please choose the assignee">
                    <Option>
                         <Avatar className='mx-5' size={avatarSize} icon={<UserOutlined />} />
                         <span className="mx-5">Unassigned</span>
                    </Option>
                    {/* Loop through the users */}
                    {users?.map(user => {
                         return (
                              <Option key={user._id} value={user._id}>
                                   <Avatar className='mx-5' size={avatarSize} src={user.imgSRC} />
                                   <span className="mx-5">{user.firstName} {user.lastName}</span>
                              </Option>
                         )
                    })}
               </Select>
          </div>
     )
}

export default EditAssigneeSelect