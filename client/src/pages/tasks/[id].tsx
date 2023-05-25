import React, { useEffect, useState } from 'react'
import Layout from "@/layouts/Layout"
import { useRouter } from 'next/router';
import { AuthState, ITaskState, IUser, RootState } from '@/types/global';
import { useDispatch, useSelector } from 'react-redux';
import { getTask } from '@/features/tasks/redux/taskSlice';
import { UserOutlined, DeleteOutlined, StarOutlined, StarFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { pinItem } from '@/features/users/redux/userSlice';
import { isLoginByToken } from '@/features/authentication/redux/authenticationSlice';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { isItemPinned } from '@/features/tasks/utils/task.util';


const Task = () => {
  const router = useRouter();
  const { id }: any = router.query;

  const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

  const handlePinItem = async (itemId: any) => {
    await dispatch(pinItem(itemId))
    dispatch(isLoginByToken())
  };

  const { task }: ITaskState = useSelector((state: RootState) => state.task);
  const { user }: AuthState = useSelector((state: RootState) => state.auth);


  useEffect(() => {
    dispatch<any>(getTask(id))
  }, [dispatch, id])

  useEffect(() => {

  }, [task])
  return (
    <Layout>
      <div className='flex place-items-center gap-2'>
        <h1 className='text-2xl'>
          {task?.title}
        </h1>


        <Button
          className='mb-4'
          key={task._id}
          // size='large'
          onClick={() => handlePinItem(task._id)}
          type="text"
          shape="circle"
          icon={
            isItemPinned(user?.pinned_items, task._id)
              ?
              <StarFilled style={{ marginBottom: "10px", color: '#ffbe0b' }} />
              :
              <StarOutlined style={{ marginBottom: "10px", color: 'black' }} />
          }
        />
      </div>


      <p className='text-lg'>
        {task?.description}
      </p>
      <hr className='mb-6' />
      <p>
        Priority: <span className="font-semibold">{task?.priority}</span>
      </p>
      <p>
        Created by: <span className="font-semibold">{task?.created_by?.firstName}</span>
      </p>
    </Layout>
  )
}

export default Task