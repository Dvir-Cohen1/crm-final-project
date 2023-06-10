import React from 'react'
import { Avatar, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import { RootState } from '@/types/global';
import { useSelector } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';

interface DataType {
     key: string;
     name: string;
     age: number;
     address: string;
     role: string;
}

const CustomTable = ({ data, handleDeleteUser }: any) => {
     const role = useSelector((state: RootState) => state.auth?.user?.role || {});

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
               render: (imgSRC) => <Avatar src={imgSRC} size={30} icon={<UserOutlined />}></Avatar>
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
                         {
                              <Tag color={role.length > 5 ? 'geekblue' : 'green'} key={role}>
                                   {role.toUpperCase()}
                              </Tag>
                         }
                    </>
               ),
          },
          {
               title: 'Action',
               key: 'action',
               render: (_, record: any) => (
                    role == "admin" ?
                         <Space size="middle">
                              <button onClick={() => handleDeleteUser(record._id)}>Delete</button>
                         </Space>
                         : 'Only Admins can perform actions'
               ),
          },
     ];
     return (
          <Table size='small' scroll={{ x: 1500 }} bordered columns={usersColumns} dataSource={data} />
     )
}

export default CustomTable