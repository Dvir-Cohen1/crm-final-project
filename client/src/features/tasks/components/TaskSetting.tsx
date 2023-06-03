
import React from 'react'
import { Button, Dropdown, Space, Tooltip } from 'antd';
import { EllipsisOutlined, DeleteOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import PopConfirm from '@/components/common/PopConfirm';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { deleteTask } from '../redux/taskSlice';
import { useRouter } from 'next/router';
const TaskSetting = ({ taskId }: any) => {

     const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
     const router = useRouter();


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
                    <>
                         Clone
                    </>
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
                    <li onClick={()=>window.print()}>
                         Print
                    </li>
               ),
          },
     ];
     return (
          <Space wrap>
               <Tooltip title="status">
                    <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
                         <Button type="default" className='font-semibold' icon={<EllipsisOutlined />} />
                    </Dropdown>
               </Tooltip>
          </Space>
     )
}

export default TaskSetting