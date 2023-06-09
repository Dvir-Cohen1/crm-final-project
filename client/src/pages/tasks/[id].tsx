import React, { useEffect } from 'react'
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
import PriorityTags from '@/features/tasks/components/PriorityTags';
import PrioritySelect from '@/features/tasks/components/forms/PrioritySelect';
import EditPrioritySelect from '@/features/tasks/components/forms/EditPrioritySelect';
import EditAssigneeSelect from '@/features/tasks/components/forms/EditAssigneeSelect';
import EditDueDate from '@/features/tasks/components/forms/EditDueDate';



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
  const handleEditTask = async (e: React.KeyboardEvent<HTMLInputElement>, fieldName?: string) => {
    const taskId = task?._id
    let inputName;
    let inputValue;

    switch (fieldName) {
      case "priority":
        inputName = "priority";
        inputValue = e;
        break;
      case "assignee":
        inputName = "assignee";
        if (e === null) {
          inputValue = [];
        } else {
          inputValue = e;
        }
        break;
      case "due_date":
        inputName = "due_date";
        inputValue = e;
        break;
      default:
        inputName = e.currentTarget?.name;
        inputValue = e.currentTarget?.value;
        if (!inputName || !inputValue || String(inputValue).length <= 3) return;
        break;
    }

    const taskData = {
      [inputName]: inputValue
    }

    await dispatch<any>(editTask({ taskId, taskData }))
    await dispatch<any>(getTask(id))
    // message.destroy()
  };


  const mainTaskActionButtons = [
    { title: 'Attach', icon: <PaperClipOutlined /> },
    { title: 'Link issue', icon: <ClusterOutlined /> },
    { title: 'Reports', icon: <FilePdfOutlined /> },
    { title: 'Export', icon: <ExportOutlined /> },
  ]

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
        <h1 className='text-2xl'>
          <Input style={{ color: "#000" }} name='title' onPressEnter={(e) => handleEditTask(e)} maxLength={40} size='middle'
            className='edit-task-input text-xl' placeholder={task?.title} />
        </h1>
      </section>

      {/* Main actions section */}
      <section className='flex justify-between gap-3 mb-5'>
        <div className='flex gap-3'>
          {
            mainTaskActionButtons.map((item, indexId) => {
              return (
                <Button key={indexId} type="default" className='font-semibold' icon={item.icon}>{item.title} </Button>
              )
            })
          }
        </div>
        <div>
          <TaskSetting taskId={task?._id} taskTitle={task?.title} />
        </div>
      </section>

      <hr className='mb-6' />

      {/* Left Col */}
      <Row>
        <Col span={18} push={0}>
          <section>
            <div className="task-description">
              <h1>Description</h1>
              <p>
                <Input name='description' onPressEnter={(e) => handleEditTask(e)} maxLength={40} size='middle'
                  className='edit-task-input' placeholder={task?.description} />


              </p>
            </div>
            <div className="task-attachments">
              <TaskAttachments />
            </div>
          </section>
        </Col>


        {/* right Col */}
        <Col span={6} pull={0}>
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
                      Assignee:
                    </Col>
                    <Col span={18} >
                      <EditAssigneeSelect assignee={task?.assignee} handleEditTask={handleEditTask} />
                    </Col>
                  </Row>
                  {/* Priority */}
                  <Row>
                    <Col span={6} >
                      Priority:
                    </Col>
                    <Col span={18} >
                      <EditPrioritySelect handleEditTask={handleEditTask} defaultValue={task?.priority} />
                    </Col>
                  </Row>
                  {/* Due Date */}
                  <Row>
                    <Col span={6} >
                      Due Date:
                    </Col>
                    <Col span={18} >
                      <EditDueDate dueDate={task?.due_date} handleEditTask={handleEditTask} />
                      {/* <div className="font-semibold">{task?.due_date}</div> */}
                    </Col>
                  </Row>
                  {/* Created by */}
                  <Row>
                    <Col span={6} >
                      Reporter:
                    </Col>
                    <Col span={18} >
                      <div className="font-semibold">{task?.created_by?.firstName} {task?.created_by?.lastName}</div>
                    </Col>
                  </Row>
                </Col>
              </Panel>
            </Collapse>
            <div className='mx-2 my-3 text-xs'>
              Created by: <span className="font-semibold">{task?.created_by?.firstName} {task?.created_by?.lastName}</span>
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