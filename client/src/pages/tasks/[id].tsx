import React, {useEffect } from 'react'
import Layout from "@/layouts/Layout"
import { useRouter } from 'next/router';
import { AuthState, ITaskState, RootState } from '@/types/global';
import { isItemPinned } from '@/features/tasks/utils/task.util';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { editTask, getTask } from '@/features/tasks/redux/taskSlice';
import { pinItem } from '@/features/users/redux/userSlice';
import { isLoginByToken } from '@/features/authentication/redux/authenticationSlice';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
//  Ant Design
import { StarOutlined, StarFilled, PaperClipOutlined, ClusterOutlined, ExportOutlined, FilePdfOutlined, SlidersOutlined, EllipsisOutlined } from '@ant-design/icons';
import StatusDropDown from '@/features/tasks/components/StatusDropDown';
import { Collapse, Col, Row, Button, Avatar, message } from 'antd';
import Link from 'next/link';
import TaskAttachments from '@/features/tasks/components/TaskAttachments';
import TaskSetting from '@/features/tasks/components/TaskSetting';
import { Input } from 'antd';

const { Panel } = Collapse;

const Task = () => {
  const router = useRouter();
  const { id }: any = router.query;

  const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

  const handlePinItem = async (itemId: any) => {
    await dispatch(pinItem(itemId))
    dispatch(isLoginByToken())
  };

  // Get the task state from redux slices
  const { task }: ITaskState = useSelector((state: RootState) => state.task);
  // Get logged in user state from redux slices
  const { user }: AuthState = useSelector((state: RootState) => state.auth);
  

  useEffect(() => {
    // Listen for changes in the task id - (for query and page change)
    dispatch<any>(getTask(id))
  }, [dispatch, id])

  useEffect(() => {
    // Listen for any changes in task data and get updated data
  }, [task,])

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  // Performe edit task when clicking enter inside the inputs
  const handleEditTask = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    message.loading("loading...")
    const inputValue = e.currentTarget.value;
    const inputName = e.currentTarget.name;
    const taskId = task?._id

    const taskData = {
      [inputName]:inputValue
    }

    await dispatch<any>(editTask({ taskId, taskData }))
    await dispatch<any>(getTask(id))
    message.destroy()
  };

  return (
    <Layout>
      <div className='flex place-items-center gap-2'>
        <Button
          className='mb-4'
          key={task?._id}
          onClick={() => handlePinItem(task?._id)}
          type="text"
          shape="circle"
          icon={
            isItemPinned(user?.pinned_items, task?._id)
              ?
              <StarFilled style={{ marginBottom: "10px", color: '#ffbe0b' }} />
              :
              <StarOutlined style={{ marginBottom: "10px", color: 'black' }} />
          }
        />
        <h1 className='text-2xl'>

          <Input name='title' onPressEnter={(e)=> handleEditTask(e)} maxLength={40} defaultValue={task?.title} size='middle'
           className='edit-task-input text-xl' placeholder={task?.title} />
        </h1>

      </div>

      <div className='flex justify-between gap-3 mb-5'>
        <div className='flex gap-3'>
          <Button type="default" className='font-semibold' icon={<PaperClipOutlined />}>Attach </Button>
          <Button type="default" className='font-semibold' icon={<ClusterOutlined />}>Link issue </Button>
          <Button type="default" className='font-semibold' icon={<FilePdfOutlined />}>Reports </Button>
          <Button type="default" className='font-semibold' icon={<ExportOutlined />}>Export </Button>
        </div>
        <div>
          <TaskSetting taskId={task?._id} taskTitle={task?.title} />
        </div>
      </div>

      <hr className='mb-6' />

      <Row>
        <Col span={18} push={0}>
          <section>
            <div className="task-description">
              <h1>Description</h1>
              <p>
              <Input name='description' onPressEnter={(e)=> handleEditTask(e)} maxLength={40} defaultValue={task?.description} size='middle'
               className='edit-task-input' placeholder={task?.description} />

                {/* {task?.description} */}
              </p>
            </div>
            <div className="task-attachments">
              <TaskAttachments />
            </div>
          </section>
        </Col>
        <Col span={6} pull={0}>
          <section>
            <div className='mb-5'>
              <StatusDropDown status={task?.status} taskId={task?._id} getTask={getTask} />
              <Button type="default" className='font-semibold' icon={<SlidersOutlined />}>Actions </Button>
            </div>

            <Collapse defaultActiveKey={['1']} onChange={onChange}>
              <Panel header="Details" key="1">
                <p>
                  Priority: <span className="font-semibold">{task?.priority}</span>
                </p>
                <p>
                  Created by: <span className="font-semibold">{task?.created_by?.firstName} {task?.created_by?.lastName}</span>
                </p>
                <p>
                  Assignee: <span className="font-semibold mx-2">
                    {
                      task?.assignee?.map((item: { _id: string, imgSRC: string }, indexId: string) => {
                        return (
                          <Link key={indexId} href={`/users/${item._id}`}>
                            <Avatar src={item.imgSRC} size={32} />
                          </Link>
                        )
                      })
                    }
                  </span>
                </p>
                <p>
                  Followers: <span className="font-semibold mx-2">
                    {
                      task?.followers?.map((item: { _id: string, imgSRC: string }, indexId: string) => {
                        return (
                          <Link key={indexId} href={`/users/${item._id}`}>
                            <Avatar src={item.imgSRC} size={32} />
                          </Link>
                        )
                      })
                    }
                  </span>
                </p>
                <p>
                  Due Date: <span className="font-semibold">{task?.due_date}</span>
                </p>
              </Panel>
            </Collapse>
            <div className='mx-2 my-3 text-xs'>
              Created: {task?.created_by?.firstName}
            </div>
            <div className='mx-2 my-3 text-xs'>
              Updated: {task?.created_by?.firstName}
            </div>
          </section>
        </Col>
      </Row>
    </Layout>
  )
}

export default Task