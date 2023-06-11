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
  StarOutlined, StarFilled, PaperClipOutlined, ClusterOutlined, ExportOutlined, FilePdfOutlined, SlidersOutlined, LockOutlined, UnlockOutlined
} from '@ant-design/icons';
import StatusDropDown from '@/features/tasks/components/StatusDropDown';
import { Collapse, Col, Row, Button, Dropdown, MenuProps, Space } from 'antd';
import TaskAttachments from '@/features/tasks/components/TaskAttachments';
import TaskSetting from '@/features/tasks/components/TaskSetting';
import { Input } from 'antd';
import EditPrioritySelect from '@/features/tasks/components/forms/EditPrioritySelect';
import EditAssigneeSelect from '@/features/tasks/components/forms/EditAssigneeSelect';
import EditDueDate from '@/features/tasks/components/forms/EditDueDate';
import useEditTask from '@/features/tasks/hooks/useEditTask';
import { formatDateTimeToString } from '@/utils/date';
import TypeTags from '@/features/tasks/components/TypeTags';

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
  }, [task])

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  // Performe edit task when clicking enter inside the inputs
  const { handleEditTask } = useEditTask();

  const mainTaskActionButtons = [
    { title: 'Attach', icon: <PaperClipOutlined /> },
    { title: 'Link issue', icon: <ClusterOutlined /> },
    { title: 'Reports', icon: <FilePdfOutlined /> },
    { title: 'Export', icon: <ExportOutlined /> },
  ]

  const onMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
  };


  return (
    <Layout>
      {/* Task title section */}
      <section className='flex place-items-center gap-2'>
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

        <TypeTags type={task?.type} handleEditTask={handleEditTask} />

        <h1 className='text-2xl'>
          <Input style={{ color: "#000" }} name='title' onBlur={(e: any) => handleEditTask(e)} onPressEnter={(e) => handleEditTask(e)} maxLength={40} size='middle'
            className='edit-task-input text-xl' defaultValue={task?.title} />
        </h1>


      </section>

      {/* Main actions section */}
      <section className='flex justify-between flex-wrap gap-3 mb-3'>
        <div className='flex flex-wrap gap-3'>
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
          <section>
            <div className="task-description">
              <h1 className='mb-3'>Description</h1>
              <p>
                <Input name='description' onBlur={(e: any) => handleEditTask(e)} onPressEnter={(e) => handleEditTask(e)} maxLength={40} size='middle'
                  className='edit-task-input' defaultValue={task?.description} />
              </p>
            </div>
            <div className="task-attachments">
              <TaskAttachments />
            </div>
            <hr className='xs:block sm:block lg:hidden my-6 ' />
          </section>
        </Col>

        {/* right Col */}
        <Col span={8} xs={24} md={8} >
          <section>

            <div className='mb-5'>
              <StatusDropDown
                status={task?.status}
                taskId={task?._id}
                getTask={getTask}
              />
              <Button
                type="default"
                className='font-semibold'
                icon={<SlidersOutlined />}
              >
                Actions
              </Button>

            </div>

            <Collapse defaultActiveKey={['1']} onChange={onChange}>
              <Panel header="Details" key="1">
                <Col className='task-details-ul' >
                  {/* Assignee */}
                  <Row>
                    <Col span={6} >
                      <h6>
                        Assignee:
                      </h6>
                    </Col>
                    <Col span={18} >
                      <EditAssigneeSelect assignee={task?.assignee} handleEditTask={handleEditTask} />
                    </Col>
                  </Row>
                  {/* Priority */}
                  <Row>
                    <Col span={6} >
                      <h6>
                        Priority:
                      </h6>
                    </Col>
                    <Col span={18} >
                      <EditPrioritySelect handleEditTask={handleEditTask} defaultValue={task?.priority} />
                    </Col>
                  </Row>
                  {/* Due Date */}
                  <Row>
                    <Col span={6} >
                      <h6>
                        Due date:
                      </h6>
                    </Col>
                    <Col span={18} >
                      <EditDueDate dueDate={task?.due_date} handleEditTask={handleEditTask} />
                    </Col>
                  </Row>
                  {/* Created by */}
                  <Row>
                    <Col span={6} >
                      <h6>
                        Reporter:
                      </h6>
                    </Col>
                    <Col span={18} >
                      <div className="font-semibold">{task?.created_by?.firstName} {task?.created_by?.lastName}</div>
                    </Col>
                  </Row>
                </Col>
              </Panel>
            </Collapse>
            <div className='mx-4 mt-4 text-xs tect-[#626f86]'>
              Created {formatDateTimeToString(task?.createdAt)}
            </div>
            <div className='mx-4 md:my-2 mt-2 mb-5 text-xs tect-[#626f86]'>
              Updated {formatDateTimeToString(task?.updatedAt)}
            </div>
          </section>
        </Col>
      </Row>
    </Layout>
  )
}

export default Task