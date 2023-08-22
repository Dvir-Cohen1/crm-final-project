import React, { useState } from 'react'
import AppLogo from '@/components/common/AppLogo'
import { MenuProps } from 'antd';
import { Menu } from 'antd';
import NextLink from 'next/link';
import { Button } from '@/components/common/Button';
import { FaCaretDown } from 'react-icons/fa';
import router from 'next/router';
import Link from 'next/link';


const items: MenuProps['items'] = [

     {
          label: (
               <div>

                    <NextLink href="/" rel="noopener noreferrer">
                         Dashboard
                    </NextLink>
               </div>
          ),
          key: '/',
     },
     {
          label: "My Work",
          key: '/myWork',
     },
     {
          label: (
               <div>

                    <NextLink href="/" rel="noopener noreferrer">
                         Pinned Items
                    </NextLink>
               </div>
          ),
          key: '/myWork/1',
     },

     {
          label: (
               <Button fontSize='sm' variant='primary' className='h-9 bg-altButtonColor'>
                    Create <FaCaretDown />
               </Button>

          ),
          key: 'SubMenu',

          children: [
               {
                    key: 1,
                    label: (<Link href={'/tasks/newTask'}>Task</Link>),

               },
               {
                    key: 2,
                    label: (<Link href={'/projects/newProject'}>Project</Link>),

               },
               {
                    key: 3,
                    label: (<Link href={'/customers/newCustomer'}>Customer</Link>),

               },
               {
                    key: 4,
                    label: (<Link href={'/users/newUser'}>User</Link>),

               },
               // {
               //      type: 'group',
               //      label: 'Projects',
               //      children: [
               //           {
               //                label: 'New Project',
               //                key: '/2',
               //           },
               //           {
               //                label: 'New Group Projects',
               //                key: '/3',
               //           },
               //      ],
               // },
               // {
               //      type: 'group',
               //      label: 'Users',
               //      children: [
               //           {
               //                label: 'New User',
               //                key: '/users/newUser',
               //           },
               //      ],
               // },
          ],
     },

];

const MainItems = () => {
     const [current, setCurrent] = useState('mail');
     const onClick: MenuProps['onClick'] = (e) => {
          router.push(e.key)
          setCurrent(e.key);
     };
     return (
          <>
               <AppLogo fontSize='lg' title="CRM" />
               <Menu
                    key={"123"}
                    className='hidden border-0 bg-transparent app-navbar lg:flex place-items-center flex-auto'
                    style={{ minWidth: 0, flex: "auto" }}
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                    items={items}
                    triggerSubMenuAction="click"

               />
          </>
     )
}

export default MainItems