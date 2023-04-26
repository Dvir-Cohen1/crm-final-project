import React from 'react'
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import { RootState } from '@/types/global';
import { useSelector } from 'react-redux';
import { deleteUser } from '@/features/users/redux/userSlice';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

interface DataType {
     key: string;
     name: string;
     age: number;
     address: string;
     role: string[];
}


const CustomTable = ({ data, handleDelete }: any) => {
     const role = useSelector((state: RootState) => state.auth?.user?.role || {});
     const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
     // const dispatch = useDispatch()

     // const handleDelete = (userId: string) => {
     //      dispatch(deleteUser(userId))
     // }
     

     const usersColumns: ColumnsType<DataType> = [
          {
               title: 'id',
               dataIndex: '_id',
               key: 'id',
               render: (id) => <Link href={`/users/${id}`}>{id}</Link>,
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
               render: (_, { role }) => (
                    <>
                         {role.map((item) => {
                              // let color = item.length > 5 ? 'geekblue' : 'green';
                              let color = item.toLocaleLowerCase() === "member" ? 'geekblue' : 'green';
                              // console.log(item)
                              if (item === 'loser') {
                                   color = 'volcano';
                              }
                              return (
                                   <Tag color={color} key={item}>
                                        {item.toUpperCase()}
                                   </Tag>
                              );
                         })}
                    </>
               ),
          },
          {
               title: 'Action',
               key: 'action',
               render: (_, record: any) => (
                    role == "Admin" ?
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