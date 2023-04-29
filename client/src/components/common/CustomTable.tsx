import React from 'react'
import { Avatar, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import { RootState } from '@/types/global';
import { useSelector } from 'react-redux';
import { deleteUser } from '@/features/users/redux/userSlice';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { UserOutlined } from '@ant-design/icons';
import Image from 'next/image'
interface DataType {
     key: string;
     name: string;
     age: number;
     address: string;
     role: string;
}


const CustomTable = ({ data, handleDelete }: any) => {
     const role = useSelector((state: RootState) => state.auth?.user?.role || {});
     const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
     // const dispatch = useDispatch()

     // const handleDelete = (userId: string) => {
     //      dispatch(deleteUser(userId))
     // }


     // let color = role?.toLocaleLowerCase() === "member" ? 'geekblue' : 'green';
     const usersColumns: ColumnsType<DataType> = [
          {
               title: 'id',
               dataIndex: '_id',
               key: 'id',
               render: (id) => <Link href={`/users/${id}`}>{id}</Link>,
          },
          {
               title: 'Profile Image',
               dataIndex: 'imgSRC',
               key: 'imgSRC',
               render: (imgSRC) => imgSRC ? <img className='rounded' width={60} src={imgSRC} alt="profile image" /> : <Avatar size={30} icon={<UserOutlined />}></Avatar>
          },
          {
               title: 'First Name',
               dataIndex: 'firstName',
               key: 'first-name',
          },
          {
               title: 'Last Name',
               dataIndex: 'lastName',
               key: 'last-name',
          },
          {
               title: 'Email',
               dataIndex: 'email',
               key: 'email',
          },
          {
               title: 'Role',
               key: 'role',
               dataIndex: 'role',
               // render: (_, { role }) => (
               //      <>
               //           {
               //                // let color = item.length > 5 ? 'geekblue' : 'green';

               //                // console.log(item)
               //                role === 'loser' ? color = 'volcano' : ''}
               //                return (
               //           <Tag color={color} key={role}>
               //                {role.toUpperCase()}
               //           </Tag>
               //           );
               //           }
               //      </>
               // ),
          },
          {
               title: 'Action',
               key: 'action',
               render: (_, record: any) => (
                    role == "admin" ?
                         <Space size="middle">
                              <button onClick={() => handleDelete(record._id)}>Delete</button>
                         </Space>
                         : 'Only Admins can perform actions'
               ),
          },
     ];
     return (
          <Table bordered columns={usersColumns} dataSource={data} />
     )
}

export default CustomTable