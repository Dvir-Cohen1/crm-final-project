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

type TStatusDropDown = {
     status: {
          _id: string
          label: string
          color: string
     },
     taskId:string,
     getTask:Function,
     setTableKey?: Function
}

const StatusDropDown = ({ status, taskId, getTask, setTableKey }: TStatusDropDown) => {

     const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
     const { taskStatuses }: ITaskState = useSelector((state: RootState) => state.task);

     // Get all task statuses when component mount
     useEffect(() => {
          dispatch<any>(getTasksStatuses())
     }, [dispatch])

     const handleChangeStatus = async (slectedStatus: string) => {

          if (slectedStatus === status._id) {
               // id the selected status is the same current status return without action
               return
          }

          // Perfome edit
          dispatch<any>(editTask({ taskId, taskData: { status: slectedStatus } }))

          // Set time out for loading effect
          setTimeout(() => {
               dispatch<any>(getTask(taskId))
               // Check if StatusDropDown called from task Table, if not setTableKey will return undefined (Error)
               // setTableKey is used for re-rendering the tasks table
               if (typeof setTableKey === 'function') {
                    setTableKey(Date.now().toString());
               }
          }, 500);
     }

     // Get normelized statuses array for passing to the dropdown component
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