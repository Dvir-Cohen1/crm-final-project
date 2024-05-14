
import React, { useEffect, useState } from 'react'
import { ITasks } from '@/types/global';
import Layout from '@/layouts/Layout'
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import TasksTable from '@/features/tasks/components/tables/TasksTable'
import { allTasks, deleteTask, newTask } from '@/features/tasks/redux/taskSlice';
import NewTaskDrawer from '@/features/tasks/components/NewTaskDrawer';
import { Button, message } from 'antd';
import PageTitle from '@/components/common/PageTitle';

const Tasks = () => {
  const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

  const [tasks, setTasks] = useState<ITasks[]>([]);


  useEffect(() => {
    dispatch<any>(allTasks()).then((res: any) => {
      // const tasks = res.payload.filter((task: any) => task.status.label !== "Done")
      // console.log(tasks)
      setTasks(res.payload)
    })
  }, [dispatch])

  const handleDelete = (userId: string) => {
    dispatch(deleteTask(userId)).then(() => {
      // After the user is deleted, fetch the updated list of users
      dispatch<any>(allTasks()).then((res: any) => setTasks(res.payload))
    });
  };

  useEffect(() => {
    // Listen for changes to the `tasks` state variable and update the table
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
    dispatch<any>(allTasks()).then((res: any) => setTasks(res.payload))
    onClose()
  };

  // Table key 
  const [tableKey, setTableKey] = useState(Date.now().toString());

  useEffect(() => {
    // Listen for changes to the `tableKey` state variable and update the table
    dispatch<any>(allTasks()).then((res: any) => setTasks(res.payload))
  }, [dispatch, tableKey])
  return (
    <Layout>
      <PageTitle title='Tasks' href='' onClick={showDrawer} />
      <NewTaskDrawer open={open} onClose={onClose} onSubmit={onSubmit} />
      <TasksTable tableKey={tableKey} setTableKey={setTableKey} handleDelete={handleDelete} tasks={tasks} />
    </Layout>
  )
}

export default Tasks