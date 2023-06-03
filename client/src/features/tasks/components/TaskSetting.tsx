
import React, { useState } from 'react'
import { Button, Dropdown, Space, Tooltip } from 'antd';
import { EllipsisOutlined, DeleteOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import PopConfirm from '@/components/common/PopConfirm';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { cloneTask, deleteTask } from '../redux/taskSlice';
import { useRouter } from 'next/router';
import CloneTaskModal from './CloneTaskModal';
import useCloneTaskModal from '../hooks/useCloneTaskModal';
const TaskSetting = ({ taskId,taskTitle }: any) => {

     const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
     const router = useRouter();

     // Clone Task Modal
     const { isOpen, openModal, handleCancel } = useCloneTaskModal();

     // Perfome delete task
     function handleDeleteTask() {
          dispatch(deleteTask(taskId))
          router.push('/tasks');
     }

     const items: MenuProps['items'] = [
          {
               key: '1',
               label: (
                    <>
                         Move
                    </>
               ),
          },
          {
               key: '2',
               label: (

                    <li onClick={openModal}>
                         Clone
                    </li>
               ),
          },
          {
               key: '3',
               label: (
                    <PopConfirm
                         placement={"topRight"}
                         description='Are you sure you want to delete this task?'
                         confirm={() => handleDeleteTask()}
                    >
                         <li>Delete</li>

                    </PopConfirm>
               ),
          },
          {
               type: 'divider',
          },
          {
               key: '4',
               label: (
                    <li onClick={() => window.print()}>
                         Print
                    </li>
               ),
          },
     ];
     return (
          <Space wrap>
               <CloneTaskModal taskId={taskId} taskTitle={taskTitle} isOpen={isOpen} handleCancel={handleCancel} />
               <Tooltip title="status">
                    <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
                         <Button type="default" className='font-semibold' icon={<EllipsisOutlined />} />
                    </Dropdown>
               </Tooltip>
          </Space>
     )
}

export default TaskSetting