import { formatDateTimeToString } from '@/utils/date';
import { Avatar, Button, message } from 'antd';
import React, { useState } from 'react'
import { Input } from 'antd';
import { RootState, TaskState, UserState } from '@/types/global';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { addTaskComment, deleteTask, deleteTaskComment, getTask } from '../../redux/taskSlice';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { MAXIMUM_TASK_COMMENT_CHARACTERS, MINIMUM_TASK_COMMENT_CHARACTERS } from '../../constants/main';

type TCommentsItem = {
     _id: string,
     content: string,
     createdAt: string,
     updatedAt: string,
     postedBy:
     {
          _id: string,
          email: string,
          firstName: string,
          lastName: string,
          role: string,
          imgSRC: string
     },
}


const Comments = ({ comments }: any) => {
     const { user }: UserState = useSelector((state: RootState) => state.auth);
     const { task }: any = useSelector((state: RootState) => state.task);

     const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

     const [isFocused, setIsFocused] = useState(false)
     const [inputValue, setInputValue]: any = useState(null)

     const onBlur = (e?: any) => {
          const { value } = e.target
          const valueLength = value.length
          if (valueLength > 0) return setIsFocused(true)
          setIsFocused(false)
     }

     const handleClearInput = () => {
          setInputValue('');
          setIsFocused(false);
     };

     const handleSendComment = async () => {
          if (!inputValue) return;

          if (inputValue.length < MINIMUM_TASK_COMMENT_CHARACTERS) {
               return message.warning(`Minimum ${MINIMUM_TASK_COMMENT_CHARACTERS} characters`)
          };

          if (inputValue.length > MAXIMUM_TASK_COMMENT_CHARACTERS) {
               return message.warning(`Maximum ${MAXIMUM_TASK_COMMENT_CHARACTERS} characters`)
          };


          // Send Comment
          await dispatch(addTaskComment({
               taskId: task._id,
               content: inputValue,
          }));
          // Get updated task
          await dispatch(getTask(task._id));
     }


     const handleDeleteComment = async (commentId: string) => {
          // Get updated task
          await dispatch(deleteTaskComment({ taskId: task._id, commentId }));
          await dispatch(getTask(task._id));
     }

     return (
          <div>
               <div className='flex gap-4 mb-10'>
                    <Avatar size='large' src={user?.imgSRC} />
                    <div className='w-full text-xs'>
                         <Input
                              id='comment-input'
                              onChange={(e: any) => setInputValue(e.target.value)}
                              onFocus={() => setIsFocused(true)}
                              onBlur={(e) => onBlur(e)}
                              style={{ borderRadius: '3px' }}
                              size='large'
                              className='mb-2'
                              placeholder="Add a comment..."
                              maxLength={200}
                              minLength={3}
                         />
                         {isFocused ?

                              <div className='flex gap-2'>
                                   <Button onClick={() => handleSendComment()} type='primary'>Save</Button>
                                   <Button onClick={() => handleClearInput()} type='text'>Cancel</Button>
                              </div>

                              : <div>
                                   <span className="font-semibold">Pro tip:</span>
                                   press <span style={{ backgroundColor: '#F1F2F4', margin: '0 2px' }} className="font-semibold"> M </span> to comment
                              </div>
                         }

                    </div>
               </div>
               {comments?.map((item: TCommentsItem) => (
                    <div key={item._id} style={{ marginBottom: '2rem' }} className='flex gap-3'>
                         <div><Link href={`/users/${item.postedBy._id}`}>
                              <Avatar size='large' src={item.postedBy.imgSRC} />
                         </Link></div>
                         <div className='flex flex-col gap-3'>
                              <div className='flex gap-4'>
                                   <Link href={`/users/${item.postedBy._id}`}><span className="font-semibold">{item.postedBy.firstName} {item.postedBy.lastName}</span></Link>
                                   {formatDateTimeToString(item.createdAt, true, true)}
                              </div>
                              <div>{item.content}</div>
                              <div><span className="font-semibold">Edit</span> · <span className="font-semibold default-link" onClick={() => handleDeleteComment(item._id)}>Delete</span></div>
                         </div>
                    </div>
               ))}
               <div className="block md:hidden lg:hidden xl:hidden">
                    <hr />
               </div>
          </div>
     )
}

export default Comments