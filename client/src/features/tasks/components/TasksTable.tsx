import { ColumnsType } from 'antd/es/table';
import React from 'react'
import { Button, Tooltip, Avatar, Space, Table, } from 'antd';
import { UserOutlined, DeleteOutlined, StarOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { ITaskDataType } from '@/types/global';
import PopConfirm from '@/components/common/PopConfirm';

const TasksTable = ({ tasks, handleDelete }: any) => {

     const columns: ColumnsType<ITaskDataType> = [
          {
               title: 'Title',
               dataIndex: 'title',
               key: 'title',
               render: (_, record) => <Link href={`/tasks/${record._id}`}> {record.title}</Link>,
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
               title: 'Followers',
               key: 'followers',
               dataIndex: 'followers',
               render: (_, { followers }) => (followers?.map((item: any) => {
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
                    <Space className='flex justify-center' size="middle">

                         <Button type="text" shape="default" icon={<StarOutlined />} />
                         <PopConfirm placement={"topRight"} description='Are you sure you want to delete this task?' confirm={() => handleDelete(record._id)}>

                              <Button  type="text" shape="default" icon={<DeleteOutlined />} />
                         </PopConfirm>

                         {/* <button onClick={() => handleDelete(record._id)}>Delete</button> */}
                    </Space>
               ),
          },
     ];


     // rowSelection object indicates the need for row selection
     const rowSelection = {
          onChange: (selectedRowKeys: React.Key[], selectedRows: ITaskDataType[]) => {
               console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          },
          getCheckboxProps: (record: ITaskDataType) => ({
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