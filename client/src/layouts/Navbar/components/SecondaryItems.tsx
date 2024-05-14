import React, { useState } from 'react'
import { Button, Empty, Menu, Popover, MenuProps } from 'antd';
import { FaBell, FaQuestionCircle, FaStar, FaUser } from "react-icons/fa";
import Tooltip from '@/components/common/Tooltip';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { isLoginByToken, logoutByToken } from '@/features/authentication/redux/authenticationSlice';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState, UserPinnedItems } from '@/types/global';
import Search from './Search';
import { CloseOutlined } from '@ant-design/icons'
import { pinItem } from '@/features/users/redux/userSlice';
import { createSubString } from '@/utils/text';
import { removeAllPinItemsApi } from '@/features/users/services/users.service';

function SecondaryItems() {
     const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
     const { user } = useSelector((state: RootState) => state.auth);


     // handle delete pin item
     const handlePinItem = async (itemId: any) => {
          await dispatch(pinItem(itemId))
          await dispatch(isLoginByToken())
     };

     const handleRemoveAllPinItems = async () => {
          await removeAllPinItemsApi()
          await dispatch(isLoginByToken())
     };

     const [current, setCurrent] = useState('mail');
     const onClick: MenuProps['onClick'] = (e) => {
          // console.log('click ', e);
          // setCurrent(e.key);
     };

     const pinnedDropDownContent = (
          <div className='w-48'>
               <div className='flex justify-between place-items-center mb-3'>
                    <span className='font-semibold'>
                         Pinned items
                    </span>

                    {user?.pinned_items?.length ?
                         <Button type='link' onClick={() => handleRemoveAllPinItems()} className='text-xs'>
                              Clear All
                         </Button>
                         :
                         ""
                    }
               </div>
               <ul>
                    {
                         user?.pinned_items?.length ? user?.pinned_items?.map((pinItem: UserPinnedItems, indexId: number) => {
                              const isLastItem = indexId === (user?.pinned_items ?? []).length - 1;
                              return (
                                   <div key={indexId}>
                                        <div className='my-2 font-semibold flex justify-between' key={pinItem._id}>
                                             <div>
                                                  <Link href={`/tasks/${pinItem._id}`}>
                                                       <li>
                                                            {createSubString(pinItem.title)}
                                                       </li>
                                                  </Link>
                                                  <li className='text-xs'>{createSubString(pinItem.description)}</li>
                                             </div>
                                             <Button size={'small'} onClick={() => handlePinItem(pinItem._id)} type='text'><CloseOutlined /></Button>
                                        </div>
                                        {!isLastItem && <hr className='my-4' />}
                                   </div>
                              )
                         }) : <Empty />}
               </ul>
          </div>
     );
     const knowledgeBaseDropDownContent = (
          <div>
               <p>Content</p>
               <p>Content</p>
          </div>
     );
     const notificationDropDownContent = (
          <div>
               <p> No notifications </p>
          </div>
     );
     const profileItems: MenuProps['items'] = [

          {
               label: (
                    <div className='flex place-items-center'>
                         <Tooltip arrow={false} title={user?.email || "profile"}>
                              <div
                                   className='menu-actions-svg-container'>
                                   <div className=' bg-profileButtonColor hover:bg-profileButtonColor/90 rounded-full p-1'>
                                        <FaUser color='white' fontSize={15} />
                                   </div>
                              </div>
                         </Tooltip>

                    </div>
               ),
               key: 'SubMenu2134',
               children: [
                    {
                         type: 'group',
                         label: 'Profile',
                         children: [
                              {
                                   label: (<Link href={`/users/${user?._id}`}>Personal Profile</Link>),
                                   key: 'profile',
                              },
                              {
                                   label: 'Profile Setting',
                                   key: 'ProfileSetting',
                              },
                         ],
                    },
                    {
                         type: 'group',
                         label: "Admin Panel",
                         children: [
                              {
                                   label: (<Link href={'/settings'}>Setting</Link>),
                                   key: 'appSetting',
                              },
                              {
                                   label: (<Link href={'/authentication/login'}>SIgn In</Link>),
                                   key: 'login',
                              },
                              {
                                   label: (<Link href={'/authentication/register'}>Sign Up</Link>),
                                   key: 'register',
                              },
                              { type: 'divider' },
                              {
                                   label: (<button onClick={() => dispatch(logoutByToken(user?._id))}>Logout</button>),
                                   key: 'logout',
                              },
                         ],
                    },
               ],
          },

     ];


     return (
          <div className="border-0 bg-transparent font-semibold app-navbar flex place-items-center">

               <Search />


               <Tooltip arrow={false} title="Pinned Items">
                    <Popover placement="bottomRight" content={pinnedDropDownContent} trigger="click">
                         <div className='menu-actions-svg-container'>
                              <FaStar />
                         </div>
                    </Popover>
               </Tooltip>

               <Tooltip arrow={false} title="Knowlage Base">
                    <Popover placement="bottomRight" content={knowledgeBaseDropDownContent} title="Knowlage Base" trigger="click">
                         <div className='menu-actions-svg-container'>
                              <FaQuestionCircle />
                         </div>
                    </Popover>
               </Tooltip>

               <Tooltip arrow={false} title="Notifications">
                    <Popover placement="bottomRight" content={notificationDropDownContent} title="Notifications" trigger="click">
                         <div className='menu-actions-svg-container'>
                              <FaBell />
                         </div>
                    </Popover>
               </Tooltip>
               <Menu
                    className="border-0 bg-transparent font-semibold"
                    style={{ minWidth: 0 }}
                    // onClick={handleLogout}
                    selectedKeys={[current]}
                    mode="horizontal"
                    items={profileItems}
                    triggerSubMenuAction="click"
               />
          </div>
     )
}

export default SecondaryItems