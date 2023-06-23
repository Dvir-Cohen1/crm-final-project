
import React from 'react'
import { ITaskDataType, ITaskState, RootState } from '@/types/global';
import { pinItem } from '@/features/users/redux/userSlice';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { isLoginByToken } from '@/features/authentication/redux/authenticationSlice';
import getColumns from './TableColumns';
import { Table } from 'antd';

const TasksTable = ({ tasks, handleDelete, tableKey, setTableKey }: any) => {
     const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

     const { isLoading }: ITaskState = useSelector((state: RootState) => state.task);

     // Getting the loggedIn user from redux
     const { user } = useSelector((state: RootState) => state.auth);

     // Handle Pin Task dispatch to redux
     const handlePinItem = async (itemId: any) => {
          await dispatch(pinItem(itemId))
          await dispatch(isLoginByToken())
     };

     const columns = getColumns({
          handlePinItem,
          handleDelete,
          setTableKey,
          user,
     });

     // rowSelection object indicates the need for row selection
     const rowSelection = {
          onChange: (selectedRowKeys: React.Key[], selectedRows: ITaskDataType[]) => {
               //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          },
          getCheckboxProps: (record: ITaskDataType) => ({}),
     };

     return (
          <Table
               size='small'
               scroll={{ x: 1500 }}
               bordered
               loading={isLoading}
               rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
               }}
               key={tableKey + 2}
               columns={columns}
               dataSource={tasks?.map((task: ITaskDataType) => ({ ...task, key: task._id }))}
          />
     )
}

export default TasksTable