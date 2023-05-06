import { Avatar, Space, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table';
import React from 'react'

import { UserOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';

const TasksTable = ({ tasks }: { tasks: any }) => {

     interface DataType {
          key: string;
          title: string;
          assignee: [
               {
                    firstName: string
                    imgSRC: string
               }
          ];
          firstName: string;
          created_by: {
               _id: string
               firstName: string
               imgSRC: string
          }
     }


     const columns: ColumnsType<DataType> = [
          {
               title: 'Title',
               dataIndex: 'title',
               key: 'title',
               render: (text) => <a>{text}</a>,
               // specify the condition of filtering result
               // here is that finding the name started with `value`
               // onFilter: (value: string, record) => record.name.indexOf(value) === 0,
               sorter: (a, b) => a.title.length - b.title.length,
               sortDirections: ['descend'],
          },
          {
               title: 'Description',
               dataIndex: 'description',
               key: 'description',
          },
          {
               title: 'Priority',
               dataIndex: 'priority',
               key: 'priority',
          },
          {
               title: 'Due date',
               dataIndex: 'due_date',
               key: 'due_date',
          },
          {
               title: 'Created by',
               dataIndex: 'created_by',
               key: 'created_by',
               render: (_, { created_by }) =>
                    <Link href={`/users/${created_by?._id}`}>
                         <Avatar src={created_by?.imgSRC} size={32} icon={<UserOutlined />} />
                    </Link>
          },

          {
               title: 'Assignee',
               key: 'assignee',
               dataIndex: 'assignee',
               render: (_, { assignee }) => (assignee?.map((item: any) => {
                    return (
                         <>
                              <Link href={`/users/${item._id}`}>

                                   <Avatar src={item.imgSRC} size={32} icon={<UserOutlined />} />
                              </Link>
                         </>
                    )
               }))
          },
          {
               title: 'Action',
               key: 'action',
               render: (_, record) => (
                    <Space size="middle">
                         <a>Invite {record.key}</a>
                         <a>Delete</a>
                    </Space>
               ),
          },
     ];


     // rowSelection object indicates the need for row selection
     const rowSelection = {
          onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
               console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          },
          getCheckboxProps: (record: DataType) => ({
               disabled: record.key === 'Disabled User', // Column configuration not to be checked
               key: record.key,
          }),
     };

     return (
          <Table
               size='small'
               scroll={{ x: 1500 }} bordered
               rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
               }} columns={columns} dataSource={tasks} />
     )
}

export default TasksTable