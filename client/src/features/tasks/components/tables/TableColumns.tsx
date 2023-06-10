import React from 'react'
import { ColumnsType } from 'antd/es/table';
import { Button, Avatar, Space } from 'antd';
import { UserOutlined, DeleteOutlined, StarOutlined, StarFilled } from '@ant-design/icons';
import Link from 'next/link';
import { ITaskDataType } from '@/types/global';
import PopConfirm from '@/components/common/PopConfirm';
import PriorityTags from '../PriorityTags';
import { isItemPinned } from '../../utils/task.util';
import StatusDropDown from '../StatusDropDown';
import { getTask } from '@/features/tasks/redux/taskSlice';

const getColumns = ({ handlePinItem, handleDelete, setTableKey, user }: { handlePinItem: Function, handleDelete: Function, setTableKey: Function, user: any }) => {
     const columns: ColumnsType<ITaskDataType> = [
          {
               title: 'Title',
               dataIndex: 'title',
               key: 'title',
               render: (_, record) => <Link key={record._id} href={`/tasks/${record._id}`}> {record.title}</Link>,
               // specify the condition of filtering result
               // here is that finding the name started with `value`
               // onFilter: (value: string, record) => record.name.indexOf(value) === 0,
               sorter: (a, b) => a.title.localeCompare(b.title),
               // sortDirections: ['descend'],
          },
          {
               title: 'Description',
               dataIndex: 'description',
               key: 'description',
               sorter: (a, b) => a.description.localeCompare(b.description),
               // sortDirections: ['descend'],
          },
          {
               title: 'Priority',
               dataIndex: 'priority',
               key: 'priority',
               sorter: (a, b) => a.priority?.localeCompare(b.priority),
               // sortDirections: ['descend'],
               render: (_, record) => <PriorityTags priorityTitle={record?.priority} />,
          },
          {
               title: 'Due date',
               dataIndex: 'due_date',
               key: 'due_date',
               sorter: (a, b) => {
                    const dateA = new Date(a.due_date);
                    const dateB = new Date(b.due_date);
                    return dateA.getTime() - dateB.getTime();
               },
               // sortDirections: ['descend'],
               render: (_, record) => {
                    const date = new Date(record.due_date);
                    const formattedDate = `${date.toLocaleString('en', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`;
                    return formattedDate;
               },
          },
          {
               title: 'Status',
               dataIndex: 'status',
               key: 'status',
               sorter: (a, b) => a.status.label.localeCompare(b.status.label),
               // sortDirections: ['descend'],
               render: (_, record) =>
                    <StatusDropDown status={record.status} taskId={record._id} getTask={getTask} setTableKey={setTableKey} />
          },
          {
               title: '@ Reporter',
               dataIndex: 'created_by',
               key: 'created_by',
               sorter: (a, b) => a.created_by.firstName.localeCompare(b.created_by.firstName),
               // sortDirections: ['descend'],
               render: (_, { created_by }) =>
                    <Link key={created_by?._id} href={`/users/${created_by?._id}`}>
                         <Avatar src={created_by?.imgSRC} size={32} icon={<UserOutlined />} />
                    </Link>
          },
          {
               title: 'Assignee',
               key: 'assignee',
               dataIndex: 'assignee',
               sorter: (a, b) => a.assignee[0]?.firstName.localeCompare(b.assignee[0]?.firstName),
               // sortDirections: ['descend'],
               render: (_, { assignee }) => (assignee?.map((item: any, indexId) => {
                    return (
                         <Link key={indexId} href={`/users/${item._id}`}>
                              <Avatar src={item.imgSRC} size={32} icon={<UserOutlined />} />
                         </Link>
                    )
               }))
          },
          {
               title: 'Watchers',
               key: 'followers',
               dataIndex: 'followers',
               sorter: (a, b) => a.followers[0]?.firstName.localeCompare(b.followers[0]?.firstName),
               // sortDirections: ['descend'],
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

     return columns
}

export default getColumns 