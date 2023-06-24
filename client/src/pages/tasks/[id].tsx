
import React, { useEffect } from 'react'
import Layout from "@/layouts/Layout"
import { useRouter } from 'next/router';
import { AuthState, ITaskState, RootState } from '@/types/global';
import { isItemPinned } from '@/features/tasks/utils/task.util';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getTask } from '@/features/tasks/redux/taskSlice';
import { pinItem } from '@/features/users/redux/userSlice';
import { isLoginByToken } from '@/features/authentication/redux/authenticationSlice';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
//  Ant Design
import {
  StarOutlined, StarFilled, PaperClipOutlined, ClusterOutlined, ExportOutlined, FilePdfOutlined, PlusOutlined
} from '@ant-design/icons';

import { Col, Row, Button } from 'antd';
import TaskAttachments from '@/features/tasks/components/TaskAttachments';
import TaskSetting from '@/features/tasks/components/TaskSetting';
import { Input } from 'antd';
import useEditTask from '@/features/tasks/hooks/useEditTask';
import TypeTags from '@/features/tasks/components/TypeTags';
import TaskDetailsWidget from '@/features/tasks/components/TaskDetailsWidget';
import useFileUpload from '@/features/tasks/hooks/useAttachments';

const Task = () => {
  const router = useRouter();
  const { id }: any = router.query;

  const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

  const handlePinItem = async (itemId: any) => {
    await dispatch(pinItem(itemId))
    await dispatch(isLoginByToken())
  };

  // Get the task state from redux slices
  const { task }: ITaskState = useSelector((state: RootState) => state.task);
  // Get logged in user state from redux slices
  const { user }: AuthState = useSelector((state: RootState) => state.auth);

  const fetchTaskData = async () => {
    return await dispatch<any>(getTask(id))
  }

  useEffect(() => {
    fetchTaskData()
    // Listen for changes in the task id - (for query and page change)
  }, [dispatch, id])

  useEffect(() => {
    // Listen for any changes in task data and get updated data
  }, [task])


  // Performe edit task when clicking enter inside the inputs
  const { handleEditTask } = useEditTask();

  const mainTaskActionButtons = [
    { title: 'Link issue', icon: <ClusterOutlined /> },
    { title: 'Reports', icon: <FilePdfOutlined /> },
    { title: 'Export', icon: <ExportOutlined /> },
  ]
  const { fileInputRef, handleFileChange, handleDeleteAll } = useFileUpload({ taskId: id });
  return (
    <Layout>
      {/* Task title section */}
      <section className='flex place-items-center gap-2'>
        <Button
          className='mb-4 no-print'
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

        <TypeTags type={task?.type} handleEditTask={handleEditTask} />

        <h2 className='text-2xl w-full'>
          <Input style={{ color: "#000" }} name='title' onBlur={(e: any) => handleEditTask(e)} onPressEnter={(e) => handleEditTask(e)} maxLength={40} size='middle'
            className='edit-task-input text-xl' defaultValue={task?.title} />
        </h2>
      </section>

      {/* Main actions section */}
      <section className='flex justify-between flex-wrap gap-3 mb-3 no-print'>
        <div className='flex flex-wrap gap-3'>
          <Button 
          id='upload-attachments' 
          type='ghost' 
          className='font-semibold custom-ghost-button' 
          icon={<PaperClipOutlined />} 
          onClick={() => fileInputRef.current?.click()} // Trigger file input click on button click
          >
            Attach
          </Button>
        <input
          id="file-upload"
          ref={fileInputRef}
          type="file"
          multiple
          accept="*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
          {
            mainTaskActionButtons.map((item, indexId) => {
              return (
                <Button key={indexId} type='ghost' className='font-semibold custom-ghost-button' icon={item.icon}>{item.title} </Button>
              )
            })
          }
          
        </div>



        <TaskSetting taskId={task?._id} taskTitle={task?.title} taskFollowers={task?.followers} handleEditTask={handleEditTask} />
      </section>

      <hr className='mb-6' />

      <Row>
        {/* Left Col */}
        <Col span={16} xs={24} md={16} >
          <section className='me-14'>
            <div className="task-description">
              <h2 className='mb-3'>Description</h2>
              <p>
                <Input name='description' onBlur={(e: any) => handleEditTask(e)} onPressEnter={(e) => handleEditTask(e)} maxLength={40} size='middle'
                  className='edit-task-input' defaultValue={task?.description} />
              </p>
            </div>
            <div className="task-attachments">
              <TaskAttachments taskId={task?._id} attachments={task?.attachments} />
            </div>
            <hr className='xs:block sm:block lg:hidden my-6 ' />
          </section>
        </Col>

        {/* right Col */}
        <Col span={8} xs={24} md={8} >
          <TaskDetailsWidget task={task} handleEditTask={handleEditTask} />
        </Col>
      </Row>
    </Layout >
  )
}

export default Task