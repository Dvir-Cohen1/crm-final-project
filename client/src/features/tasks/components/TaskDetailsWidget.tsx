
import React from 'react'

import { Collapse, Col, Row, Button } from 'antd';

import EditPrioritySelect from '@/features/tasks/components/forms/EditPrioritySelect';
import EditAssigneeSelect from '@/features/tasks/components/forms/EditAssigneeSelect';
import EditDueDate from '@/features/tasks/components/forms/EditDueDate';
import { formatDateTimeToString } from '@/utils/date';
import StatusDropDown from './StatusDropDown';
import { getTask } from '../redux/taskSlice';
import { SlidersOutlined } from '@ant-design/icons';


const { Panel } = Collapse;
const TaskDetailsWidget = ({ task, handleEditTask }: { task: any, handleEditTask: Function }) => {

     const onChange = (key: string | string[]) => {
          console.log(key);
     };

     return (
          <section>
               <div className='mb-5 flex gap-3'>
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
     )
}

export default TaskDetailsWidget