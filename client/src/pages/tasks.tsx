import React, { useEffect, useState } from 'react'
import Layout from '@/layouts/Layout'
import TasksTable from '@/features/tasks/components/TasksTable'
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ITasks, RootState } from '@/types/global';
import { allTasks } from '@/features/tasks/redux/taskSlice';
import Link from 'next/link';
import { Button } from '@/components/common/Button';
import NewTaskDrawer from '@/features/tasks/components/NewTaskDrawer';


const Tasks = () => {
  const tasksState = useSelector((state: RootState) => state.task?.tasks || {});
  const [tasks, setTasks] = useState<ITasks[]>(tasksState || []);
  const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

  useEffect(() => {
    dispatch<any>(allTasks()).then((res: any) => setTasks(res.payload))
  }, [dispatch])

  useEffect(() => {
    // Listen for changes to the `users` state variable and update the table
    // Note that this will only run when the `users` variable changes
  }, [tasks, tasksState]);


  // New Task Drawer
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Layout>
      <div className='flex justify-between place-items-center mb-5'>
        <div className='text-3xl font-semibold'>Tasks</div>
        <div><Button onClick={showDrawer} className='px-5' fontSize='sm' >New</Button></div>
      </div>
      <NewTaskDrawer open={open} onClose={onClose} />
      <TasksTable tasks={tasks} />
    </Layout>
  )
}

export default Tasks