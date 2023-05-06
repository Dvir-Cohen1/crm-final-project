import React, { useEffect, useState } from 'react'
import Layout from "@/layouts/Layout"
import { useRouter } from 'next/router';
import { ITaskState, RootState } from '@/types/global';
import { useDispatch, useSelector } from 'react-redux';
import { getTask } from '@/features/tasks/redux/taskSlice';
const Task = () => {
  const router = useRouter();
  const { id }: any = router.query;
  // const loggedUser = useSelector((state: RootState) => state.auth.user);
  // const task = useSelector((state: RootState) => state.task.task);
  // const [task, setTask] = useState<ITaskState>({})


  const { task }: ITaskState = useSelector((state: RootState) => state.task);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch<any>(getTask(id))
  }, [dispatch, id])

  console.log(task)

  return (
    <Layout>
      <h1 className='text-2xl'>
        {task.title}
      </h1>
      <p>
        {task.description}
      </p>
      <br />
      {task.priority}
      <br />
      {task.created_by?.firstName}
    </Layout>
  )
}

export default Task