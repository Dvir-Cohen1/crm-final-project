import React from 'react'
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Link from 'next/link';


interface DataType {
     key: string;
     name: string;
     age: number;
     address: string;
     role: string[];
}

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
                         console.log(item)
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
          render: (_, record) => (
               <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
               </Space>
          ),
     },
];

// const data: DataType[] = [
//      {
//           key: '1',
//           name: 'John Brown',
//           age: 32,
//           address: 'New York No. 1 Lake Park',
//           tags: ['nice', 'developer'],
//      },
//      {
//           key: '2',
//           name: 'Jim Green',
//           age: 42,
//           address: 'London No. 1 Lake Park',
//           tags: ['loser'],
//      },
//      {
//           key: '3',
//           name: 'Joe Black',
//           age: 32,
//           address: 'Sydney No. 1 Lake Park',
//           tags: ['cool', 'teacher'],
//      },
// ];

const CustomTable = ({ data }: any) => {
     return (
          <Table bordered columns={usersColumns} dataSource={data} />
     )
}

export default CustomTable