
import React, { useEffect, useState } from 'react'
import { Avatar, Button, Dropdown, Image, Space } from 'antd';
import {
     EllipsisOutlined,
     ShareAltOutlined,
     EyeFilled,
     PlusOutlined,
     WhatsAppOutlined,
     PushpinOutlined,
     MailOutlined,
     LinkOutlined,
     EyeOutlined,
     PhoneOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import PopConfirm from '@/components/common/PopConfirm';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { deleteTask } from '../redux/taskSlice';
import { useRouter } from 'next/router';
import CloneTaskModal from './CloneTaskModal';
import useCloneTaskModal from '../hooks/useCloneTaskModal';
import { copyPageUrlToClipboard, shareByEmail, shareViaWhatsApp } from '../utils/share.util';
import { AuthState, RootState } from '@/types/global';
import { isLoggedInUserFollower } from '../utils/task.util';
import MapModal from './MapModal';
// import { FaMapSigns, FaMapMarked, FaMapMarkedAlt, FaMapPin } from 'react-icons/fa';

const TaskSetting = ({ taskId, taskTitle, taskFollowers, handleEditTask }: any) => {
     // Get logged in user state from redux slices
     const { user }: AuthState = useSelector((state: RootState) => state.auth);

     const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
     const router = useRouter();


     const [pageUrl, setPageUrl] = useState('');

     useEffect(() => {
          setPageUrl(window.location.href);
     }, []);

     // Clone Task Modal
     const { isOpen, openModal, handleCancel } = useCloneTaskModal();

     // Perfome delete task
     function handleDeleteTask() {
          dispatch(deleteTask(taskId))
          router.push('/tasks');
     }

     const followersItems: MenuProps['items'] = [
          {
               key: '1',
               label: (isLoggedInUserFollower(taskFollowers, user?._id) ? <Space><EyeOutlined style={{ fontSize: 15 }} /> Stop watching</Space> : <Space><EyeFilled style={{ fontSize: 15 }} /> Start watching</Space>),
               onClick: (isLoggedInUserFollower(taskFollowers, user?._id) ? () => handleEditTask(null, "followers") : () => handleEditTask(user?._id, "followers")),
          },
          {
               type: 'divider',
          },
          ...(taskFollowers?.length
               ? taskFollowers.map((item: any, indexId: string) => ({
                    key: item._id, // Add a unique key for each follower
                    label: (
                         <Link href={`/users/${item._id}`}>
                              <Space>
                                   <Avatar size={'small'} src={item.imgSRC} alt="" />
                                   <span key={indexId}>{item.firstName} {item.lastName}</span>
                              </Space>
                         </Link>
                    ),
               }))
               : [
                    {
                         key: 'noFollowers',
                         label: (
                              <div className='flex flex-col place-items-center'>
                                   <Image preview={false} src="https://jira-frontend-static.prod.public.atl-paas.net/assets/people-group.6a49983f806b6c3579a522bfa7bf9311.8.svg" alt="no data" />
                                   <span className="my-2">No watchers yet</span>
                              </div>
                         ),
                    },
               ]
          ),
          {
               type: 'divider',
          },
          {
               key: '3',
               label: (
                    <div onClick={() => { }}>
                         <Space>
                              <PlusOutlined />
                              Add watchers
                         </Space>
                    </div>
               ),
          },
     ];
     const settingItems: MenuProps['items'] = [
          {
               key: '1',
               label: (
                    <>
                         Move
                    </>
               ),
          },
          {
               key: '2',
               label: (

                    <div onClick={openModal}>
                         Clone
                    </div>
               ),
          },
          {
               key: '3',
               label: (
                    <PopConfirm
                         placement={"topRight"}
                         description='Are you sure you want to delete this task?'
                         confirm={() => handleDeleteTask()}
                    >
                         <div>Delete</div>

                    </PopConfirm>
               ),
          },
          {
               type: 'divider',
          },
          {
               key: '4',
               label: (
                    <div onClick={() => window.print()}>
                         Print
                    </div>
               ),
          }
     ];

     const shareItems: MenuProps['items'] = [
          {
               key: '1',
               label: (
                    <div onClick={() => shareByEmail(pageUrl)}>
                         <Space>
                              <MailOutlined />
                              Share via Email
                         </Space>
                    </div>
               ),
          },
          {
               key: '2',
               label: (
                    <div onClick={() => shareViaWhatsApp(pageUrl)}>
                         <Space>
                              <WhatsAppOutlined />
                              Share via Whatsapp
                         </Space>
                    </div>
               ),
          },
          {
               key: '3',
               label: (
                    <div onClick={() => { copyPageUrlToClipboard(pageUrl) }}>
                         <Space>
                              <LinkOutlined />
                              Copy Link
                         </Space>
                    </div>
               ),
          },
     ];

     const [isModalOpen, setIsModalOpen] = useState(false);

     return (
          <Space size="middle" className='setting-buttons-container' wrap>
               <CloneTaskModal taskId={taskId} taskTitle={taskTitle} isOpen={isOpen} handleCancel={handleCancel} />


               <Button
                    size='middle'
                    type="text"
                    className='font-semibold'
                    icon={<PushpinOutlined className='m-0 p-0 text-sm' />}
                    onClick={() => setIsModalOpen(!isModalOpen)}
               />

               <a href="tel:+4733378901">
                    <Button
                         size='middle'
                         type="text"
                         className='font-semibold'
                         icon={<PhoneOutlined />}
                    />
               </a>

               <MapModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
               {/* followers dropdown */}
               <Dropdown overlayClassName='followers-items-dropdown' placement="bottomRight" menu={{ items: followersItems }} trigger={['click']}>
                    {taskFollowers?.length >= 1 ?

                         <Button
                              size='middle'
                              type="text"
                              style={{ width: "3.2rem" }}
                              className='font-semibold'
                              icon={
                                   <>
                                        <EyeFilled style={{ fontSize: "0.95rem", color: "#0C66E4" }} />
                                        <span style={{ color: "#0C66E4" }}>{taskFollowers?.length}</span>
                                   </>
                              }
                         />
                         :
                         <Button size='middle' type="text" className='font-semibold' icon={<EyeOutlined style={{ fontSize: "0.95rem", color: "#172B4D" }} />} />
                    }
               </Dropdown>
               {/* share dropdown */}
               <Dropdown overlayClassName='share-items-dropdown' menu={{ items: shareItems }} placement="bottomRight" trigger={['click']}>
                    <Button size='middle' type="text" className='font-semibold' icon={<ShareAltOutlined style={{ fontSize: "0.95rem", color: "#172B4D" }} />} />
               </Dropdown>
               {/* setting dropdown */}
               <Dropdown overlayClassName='setting-items-dropdown' menu={{ items: settingItems }} placement="bottomRight" trigger={['click']}>
                    <Button size='middle' type="text" className='font-semibold' icon={<EllipsisOutlined style={{ fontSize: "1.4rem", color: "#172B4D" }} />} />
               </Dropdown>
          </Space>
     )
}

export default TaskSetting