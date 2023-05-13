import React, { useEffect, useState } from 'react'
import Layout from '@/layouts/Layout'
import TasksTable from '@/features/tasks/components/TasksTable'
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ITasks, RootState } from '@/types/global';
import { allTasks, deleteTask, newTask } from '@/features/tasks/redux/taskSlice';
import Link from 'next/link';
// import { Button } from '@/components/common/Button';
import NewTaskDrawer from '@/features/tasks/components/NewTaskDrawer';
import { Button, message } from 'antd';
import { pinItem } from '@/features/users/redux/userSlice';


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
    console.log("asd")
    dispatch<any>(allTasks()).then((res: any) => setTasks(res.payload))
    onClose()
  };

  return (
    <Layout>
      <div className='flex justify-between align-center place-items-center mb-5'>
        <div className='text-2xl font-semibold'>Tasks</div>
        <div><Button type='primary' onClick={showDrawer}>New</Button></div>
      </div>
      <NewTaskDrawer open={open} onClose={onClose} onSubmit={onSubmit} />
      <TasksTable handleDelete={handleDelete} tasks={tasks} />
    </Layout>
  )
}

export default Tasks