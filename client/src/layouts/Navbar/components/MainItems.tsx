import React, { useState } from 'react'
import AppLogo from '@/components/common/AppLogo'
import { MenuProps } from 'antd';
import { Menu } from 'antd';
import NextLink from 'next/link';
import { Button } from '@/components/common/Button';
import { FaCaretDown } from 'react-icons/fa';


const items: MenuProps['items'] = [

     {
          label: (
               <div>

                    <NextLink href="/" rel="noopener noreferrer">
                         Dashboard
                    </NextLink>
               </div>
          ),
          key: 'dashboard1',
     },
     {
          label: (
               <div>

                    <NextLink href="/myWork" rel="noopener noreferrer">
                         My Work
                    </NextLink>
               </div>
          ),
          key: 'mainProject',
     },
     {
          label: (
               <div>

                    <NextLink href="/" rel="noopener noreferrer">
                         Pinned Items
                    </NextLink>
               </div>
          ),
          key: 'starred',
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
                    type: 'group',
                    label: 'Tasks',
                    children: [
                         {
                              label: 'New Task',
                              key: 'setting:1',
                         },
                         {
                              label: 'New Group Tasks',
                              key: 'setting:2',
                         },
                    ],
               },
               {
                    type: 'group',
                    label: 'Projects',
                    children: [
                         {
                              label: 'New Project',
                              key: 'setting:3',
                         },
                         {
                              label: 'New Group Projects',
                              key: 'setting:4',
                         },
                    ],
               },
          ],
     },

];


const MainItems = () => {
     const [current, setCurrent] = useState('mail');
     const onClick: MenuProps['onClick'] = (e) => {
          // console.log('click ', e);
          setCurrent(e.key);
     };
     return (
          <>
               <AppLogo fontSize='lg' title="CRM" />
               <Menu
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