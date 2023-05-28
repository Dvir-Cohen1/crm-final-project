
import React from 'react'
import { ColumnsType } from 'antd/es/table';
import { Button, Avatar, Space } from 'antd';
import { UserOutlined, DeleteOutlined, StarOutlined, StarFilled } from '@ant-design/icons';
import Link from 'next/link';
import { ITaskDataType, IUser, RootState, UserState } from '@/types/global';
import PopConfirm from '@/components/common/PopConfirm';
import PriorityTags from '../PriorityTags';
import { isItemPinned } from '../../utils/task.util';

type TableColumnsProps = {
     user: IUser,
     handlePinItem: Function
     handleDelete: Function

}

const TableColumns = ({ user, handlePinItem, handleDelete }: TableColumnsProps) => {

     return const Columns: ColumnsType<ITaskDataType> = [
          {
               title: 'Title',
               dataIndex: 'title',
               key: 'title',
               render: (_, record) => <Link key={record._id} href={`/tasks/${record._id}`}> {record.title}</Link>,
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
               render: (_, record) => <PriorityTags priorityTitle={record?.priority} />,
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
                    <Link key={created_by?._id} href={`/users/${created_by?._id}`}>
                         <Avatar src={created_by?.imgSRC} size={32} icon={<UserOutlined />} />
                    </Link>
          },
          {
               title: 'Assignee',
               key: 'assignee',
               dataIndex: 'assignee',
               render: (_, { assignee }) => (assignee?.map((item: any, indexId) => {
                    return (
                         <Link key={indexId} href={`/users/${item._id}`}>
                              <Avatar src={item.imgSRC} size={32} icon={<UserOutlined />} />
                         </Link>
                    )
               }))
          },
          {
               title: 'Followers',
               key: 'followers',
               dataIndex: 'followers',
               render: (_, { followers }) => (followers?.map((item: any, indexId) => {
                    return (
                         <Link key={indexId} href={`/users/${item._id}`}>
                              <Avatar src={item.imgSRC} size={32} icon={<UserOutlined />} />
                         </Link>
                    )
               }))
          },
          {
               title: 'Actions',
               key: 'action',
               render: (_, record) => (
                    <Space key={record._id} className='flex justify-center' size="middle">

                         <Button
                              key={record._id}
                              onClick={() => handlePinItem(record._id)}
                              type="text"
                              shape="default"
                              icon={
                                   isItemPinned(user?.pinned_items, record._id)
                                        ?
                                        <StarFilled style={{ color: '#ffbe0b' }} />
                                        :
                                        <StarOutlined style={{ color: 'black' }} />
                              }
                         />
                         <PopConfirm
                              placement={"topRight"}
                              description='Are you sure you want to delete this task?'
                              confirm={() => handleDelete(record._id)}
                         >
                              <Button type="text" shape="default" icon={<DeleteOutlined />} />
                         </PopConfirm>
                    </Space>
               ),
          },
     ];

     return <Columns/>
}

export default TableColumns