
import React, { useEffect, useState } from 'react'
import Layout from "@/layouts/Layout"
import { useRouter } from 'next/router';
import { AuthState, ITaskState, RootState } from '@/types/global';
import { isItemPinned } from '@/features/tasks/utils/task.util';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getTask } from '@/features/tasks/redux/taskSlice';
import { pinItem } from '@/features/users/redux/userSlice';
// import { isLoginByToken } from '@/features/authentication/redux/authenticationSlice';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
//  Ant Design
import {
  StarOutlined, StarFilled, PaperClipOutlined, ClusterOutlined, ExportOutlined, FilePdfOutlined, PlusOutlined, EllipsisOutlined
} from '@ant-design/icons';

import { Col, Row, Button, Dropdown, Space, MenuProps } from 'antd';
import TaskAttachments from '@/features/tasks/components/TaskAttachments';
import TaskSetting from '@/features/tasks/components/TaskSetting';
import { Input } from 'antd';
import useEditTask from '@/features/tasks/hooks/useEditTask';
import TypeTags from '@/features/tasks/components/TypeTags';
import TaskDetailsWidget from '@/features/tasks/components/TaskDetailsWidget';
import useFileUpload from '@/features/tasks/hooks/useAttachments';
import { isLoginByToken } from '@/features/authentication/redux/authenticationSlice';
// import store, { initializeStore } from '@/redux/store';
import ActivityTabs from '@/features/tasks/components/activity/ActivityTabs';
import store from '@/redux/store';
import SkeletonLoader from '@/components/common/SkeletonLoader';
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



  const [isLoading, setIsLoading] = useState(false)
  const fetchTaskData = async () => {
    setIsLoading(true)
    await dispatch<any>(getTask(id))
    setIsLoading(false)


    return
  }

  useEffect(() => {
    fetchTaskData()
    // Listen for changes in the task id - (for query and page change)
  }, [id])

  // useEffect(() => {
  //   // Listen for any changes in task data and get updated data
  // }, [task])


  // Performs edit task when clicking enter inside the inputs
  const { handleEditTask } = useEditTask();

  const mainTaskActionButtons = [
    { title: 'Link issue', icon: <ClusterOutlined /> },
    { title: 'Reports', icon: <FilePdfOutlined /> },
  ]
  const { fileInputRef, handleFileChange, handleDeleteAll } = useFileUpload({ taskId: id });


  const exportItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div onClick={() => { }}>

          {/* <PaperClipOutlined /> */}
          csv

        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div onClick={() => { }}>

          {/* <PaperClipOutlined /> */}
          xml

        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div onClick={() => { }}>

          {/* <PaperClipOutlined /> */}
          xlsx
        </div>
      ),
    },
  ];

  // const [rowHeight, setRowHeight] = useState(0);

  // useEffect(() => {
  //   // Calculate the desired height based on your logic
  //   const calculatedHeight = window.innerHeight * 0.8; // 80% of the viewport height
  //   setRowHeight(calculatedHeight);
  // }, []);

  // console.log(window.screen.height)
  return (
    <Layout>

      {isLoading ? <SkeletonLoader isLoading={isLoading} /> :
        <section>
          {/* Task title section */}
          <div className='flex place-items-center gap-2'>
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
                className='edit-task-input text-xl' placeholder={task?.title} /* defaultValue={task?.title} */ />
            </h2>
          </div>

          {/* Main actions section */}
          <div className='flex justify-between flex-wrap gap-3 mb-3 no-print'>
            <div className='flex flex-wrap gap-3'>

              <Button
                id='upload-attachments'
                type='ghost'
                className='font-semibold custom-ghost-button'
                icon={<PaperClipOutlined />}
                onClick={() => fileInputRef.current?.click()} // Trigger file input click on button click
              >
                <div className="hidden md:inline ps-2">Attach</div>
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
                    <Button key={indexId} type='ghost' className='font-semibold custom-ghost-button' icon={item.icon}> <div className="hidden md:inline">{item.title}</div> </Button>
                  )
                })
              }
              <Dropdown overlayClassName='setting-items-dropdown' menu={{ items: exportItems }} placement="bottomLeft" trigger={['click']}>
                <Button
                  type='ghost'
                  className='font-semibold custom-ghost-button'
                  icon={<ExportOutlined />}
                // onClick={() => fileInputRef.current?.click()} // Trigger file input click on button click
                >
                  <div className="hidden md:inline ps-2">Export</div>

                </Button>
              </Dropdown>
            </div>
            <TaskSetting taskId={task?._id} taskTitle={task?.title} taskFollowers={task?.followers} handleEditTask={handleEditTask} />
          </div>
          <hr className='mb-6' />
          <Row >
            {/* Left Col */}
            <Col span={16} xs={24} md={16} >
              <div className='md:me-14'>
                <div className="task-description">
                  <h2 className='mb-3'>Description</h2>
                  <p>
                    <Input style={{ fontSize: "14px" }} name='description' onBlur={(e: any) => handleEditTask(e)} onPressEnter={(e) => handleEditTask(e)} maxLength={40} size='large'
                      className='edit-task-input' placeholder={task?.description} /* defaultValue={task?.description} */ />
                  </p>
                </div>
                <div className="task-attachments">
                  <TaskAttachments taskId={task?._id} attachments={task?.attachments} />
                </div>
                <hr className='xs:block sm:block lg:hidden my-6 ' />
              </div>
              <ActivityTabs comments={task?.comments} history={task?.history} />
            </Col>

            {/* right Col */}
            <Col span={8} xs={24} md={8} >
              <TaskDetailsWidget task={task} handleEditTask={handleEditTask} />
            </Col>
          </Row>
        </section>
      }

    </Layout >
  )
}

export default Task

// export async function getServerSideProps(context: any) {
//   const { id } = context.query;

//   // const store = initializeStore(); // Initialize your Redux store
//   const dispatch = store.dispatch; // Get the dispatch function from the store

//   // const task = await dispatch(getTask(id));
//   const task = await dispatch(getTask(id));
//   console.log(task)
//   // Check if task is undefined and replace it with null if necessary
//   const serializedTask = task === undefined ? null : null;

//   return {
//     props: {
//       task: serializedTask,
//     },
//   };
// }