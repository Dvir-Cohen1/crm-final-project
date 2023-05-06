import React, { useState } from 'react'
import { Empty, Menu, Popover } from 'antd';
import { FaBell, FaQuestionCircle, FaStar, FaUser, FaSearch, FaCaretDown, FaServicestack } from "react-icons/fa";
import { MenuProps, Input } from 'antd';
import Tooltip from '@/components/common/Tooltip';

import Link from 'next/link';
import { JsxElement } from 'typescript';
import { useDispatch, useSelector } from 'react-redux';
import { logoutByToken } from '@/features/authentication/redux/authenticationSlice';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import store from '@/redux/store';
import CustomEmpty from '@/components/common/CustomEmpty';
import { RootState } from '@/types/global';
import Search from './Search';

// const profileDropDownContent = (
//      <div>
//           <p>Content</p>
//           <hr />
//           <Link href={"authentication/login"}>Login</Link>
//      </div>
// );
const pinnedDropDownContent = (
     <div>
          <Empty />
          {/* <CustomEmpty/> */}

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








function SecondaryItems() {

     const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

     // const { user } = store.getState().auth
     const { user } = useSelector((state: RootState) => state.auth);

     const handleLogout = () => {
          dispatch(logoutByToken(user?._id))
     }


     const [current, setCurrent] = useState('mail');
     const onClick: MenuProps['onClick'] = (e) => {
          // console.log('click ', e);
          setCurrent(e.key);
     };


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
               key: 'SubMenu',
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
                                   key: 'setting',
                              },
                         ],
                    },
                    {
                         type: 'group',
                         label: "Admin Panel",
                         children: [
                              {
                                   label: 'Setting',
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
                    <Popover placement="topLeft" content={pinnedDropDownContent} title="Pinned Items" trigger="click">
                         <div className='menu-actions-svg-container'>
                              <FaStar />
                         </div>
                    </Popover>
               </Tooltip>

               <Tooltip arrow={false} title="Knowlage Base">
                    <Popover placement="topLeft" content={knowledgeBaseDropDownContent} title="Knowlage Base" trigger="click">
                         <div className='menu-actions-svg-container'>
                              <FaQuestionCircle />
                         </div>
                    </Popover>
               </Tooltip>

               <Tooltip arrow={false} title="Notifications">
                    <Popover placement="topLeft" content={notificationDropDownContent} title="Notifications" trigger="click">
                         <div className='menu-actions-svg-container'>
                              <FaBell />
                         </div>
                    </Popover>
               </Tooltip>
               {/* <Popover placement="topLeft" content={profileDropDownContent} title="פרופיל אישי" trigger="click" >
                    <div className='menu-actions-svg-container bg-profileButtonColor hover:bg-profileButtonColor/90'>
                         <FaUser color='white' fontSize={16} />
                    </div>
               </Popover> */}
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