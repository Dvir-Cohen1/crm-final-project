import React, { useEffect } from 'react'
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space, Tooltip } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { capitalizeFirstLetters } from '@/utils/text';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { editTask, getTasksStatuses } from '../redux/taskSlice';
import { ITaskState, RootState } from '@/types/global';
import useNormalizeStatusesArray from '../hooks/useNormalizeStatusesArray';

const StatusDropDown = ({ status, taskId, getTask, setTableKey }: { status: { label: string, color: string }, taskId: string, getTask: any, setTableKey?: Function }) => {

     const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
     const { taskStatuses }: ITaskState = useSelector((state: RootState) => state.task);

     // Get all task statuses when component mount
     useEffect(() => {
          dispatch<any>(getTasksStatuses())
     }, [dispatch])

     const handleChangeStatus = async (status: string) => {
          dispatch<any>(editTask({ taskId, taskData: { status } }))
          setTimeout(() => {
               dispatch<any>(getTask(taskId))

               // Check if StatusDropDown called from task Table, if not setTableKey will return undefined (Error)
               if (typeof setTableKey === 'function') {
                    setTableKey(Date.now().toString());
               }
          }, 800);
     }

     // Get normelized statuses array for passing to ant-design component
     const normalizedStatuses = useNormalizeStatusesArray(taskStatuses, handleChangeStatus);
     return (
          <Space className='mx-2' wrap>
               <Dropdown menu={{ items: normalizedStatuses }} placement="bottomLeft" trigger={['click']}>
                    {
                         status?.label ?
                              <Button className='font-semibold' type='primary' style={{ backgroundColor: status?.color }}>{capitalizeFirstLetters(status?.label)} <CaretDownOutlined /></Button>
                              :
                              <Button type='default' style={{ backgroundColor: status?.color }} loading={true}> Loading </Button>
                    }
               </Dropdown>
          </Space>
     )
}

export default StatusDropDown