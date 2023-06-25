import React, { useState, useRef, useEffect } from 'react';
import { cloneTask, getTask } from '../redux/taskSlice';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Input, Modal, Radio, message } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import router, { useRouter } from 'next/router';
import { AuthState, ITaskState, RootState } from '@/types/global';

const CloneTaskModal = ({ isOpen, handleCancel, taskId, taskTitle }: any) => {

     const router = useRouter();
     const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
     // Get logged in user state from redux slices
     const { task }: ITaskState = useSelector((state: RootState) => state.task);
     const [cloneOptions, setCloneOptions] = useState({}); // State to store checkbox values
     const [clonedTaskTitle, setTaskTitle] = useState(taskTitle || "Cloned task"); // Task title input value


     const handleCloneTask = async () => {
          message.loading("Loading...")
          const dataToSend = {
               taskId,
               cloneOptions,
               clonedTaskTitle,
          };
          const response = await dispatch(cloneTask(dataToSend));
          const clonedTaskId = response.payload?.data._id;

          dispatch(getTask(clonedTaskId)); // Fetch the updated data for the cloned task
          handleCancel()
          message.destroy()
          message.success(`Task Cloned: ${taskTitle}`)
          return router.push(`/tasks/${clonedTaskId}`);
     }

     const onChange = (e: CheckboxChangeEvent) => {
          const { name, checked } = e.target;
          setCloneOptions((prevValues) => ({
               ...prevValues,
               [name || '']: checked || false // Use an empty string as default value for name when it is undefined
          }));
     };

     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setTaskTitle(e.target.value);
     };

     return (
          <>
               <Modal
                    title="Clone task"
                    open={isOpen}
                    onCancel={handleCancel}
                    onOk={handleCloneTask}
               >
                    <section className="mt-5">
                         <p className='font-semibold text-xs'>Title</p>
                         <div className='mb-3'>
                              <Input onChange={(e) => handleInputChange(e)} defaultValue={clonedTaskTitle} placeholder={clonedTaskTitle} />
                         </div>
                         {/* <div className='mb-3'>
                              <p className='font-semibold text-xs'>Vissability</p>
                              <Radio.Group name='cloneVissability' >
                                   <Radio value={"public"}>Public</Radio>
                                   <Radio value={"private"}>Private</Radio>
                              </Radio.Group>
                         </div> */}

                         <p className='font-semibold text-xs'>Include</p>
                         <Checkbox onChange={onChange} name='cloneAssignee'>Assignee</Checkbox>
                         <br />
                         <Checkbox onChange={onChange} name='cloneFollowers'>Followers</Checkbox>
                         <br />
                         <Checkbox onChange={onChange} name='clonePriority'>Priority</Checkbox>
                         <br />
                         <Checkbox onChange={onChange} name='cloneAttachments'>Attachments</Checkbox>
                    </section>
               </Modal>
          </>
     )
}

export default CloneTaskModal