import React, { useEffect, useState } from 'react'
import Layout from '@/layouts/Layout'
import TasksTable from '@/features/tasks/components/TasksTable'
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ITasks, RootState } from '@/types/global';
import { allTasks, deleteTask, newTask } from '@/features/tasks/redux/taskSlice';
import Link from 'next/link';
import { Button } from '@/components/common/Button';
import NewTaskDrawer from '@/features/tasks/components/NewTaskDrawer';
import { message } from 'antd';


const Tasks = () => {
  const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

  const [tasks, setTasks] = useState<ITasks[]>([]);

  useEffect(() => {
    dispatch<any>(allTasks()).then((res: any) => setTasks(res.payload))
  }, [dispatch])

  const handleDelete = (userId: string) => {
    dispatch(deleteTask(userId)).then(() => {
      // After the user is deleted, fetch the updated list of users
      dispatch<any>(allTasks()).then((res: any) => setTasks(res.payload))
    });
  };

  useEffect(() => {
    // Listen for changes to the `users` state variable and update the table
    // Note that this will only run when the `users` variable changes
  }, [tasks]);

  // handle Error
  const { isError, error } = useSelector((state: RootState) => state.task);

  useEffect(() => {
    switch (isError) {
      case true:
        message.destroy()
        message.error(error)
        break;
      case false:
        message.destroy()
        message.success(error)
        break;

      default:
        break;
    }
  }, [error, isError]);

  // New Task Drawer
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: any) => {
    dispatch(newTask(data))
    dispatch<any>(allTasks()).then((res: any) => setTasks(res.payload))
    onClose()
  };

  return (
    <Layout>
      <div className='flex justify-between place-items-center mb-5'>
        <div className='text-3xl font-semibold'>Tasks</div>
        <div><Button onClick={showDrawer} className='px-5' fontSize='sm' >New</Button></div>
      </div>
      <NewTaskDrawer open={open} onClose={onClose} onSubmit={onSubmit} />
      <TasksTable handleDelete={handleDelete} tasks={tasks} />
    </Layout>
  )
}

export default Tasks