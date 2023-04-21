import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { getItem } from '@/utils/general';
type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
     getItem('Projects', 'sub1', <MailOutlined />, [

          getItem((<Link href={"/projects/project"}>Projects</Link>), null, null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
     ]),

     getItem('Tasks', 'sub2', <AppstoreOutlined />, [
          getItem((<Link href={"/tasks/task"}>Tasks</Link>), '5'),
          getItem('Option 6', '6'),
          getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
     ]),

     getItem('Members', 'sub4', <SettingOutlined />, [
          getItem('Option 9', '9'),

     ]),
     getItem('Customers', 'sub5', <SettingOutlined />, [
          getItem('Option 94', '94'),

     ]),
     getItem('Setting', 'sub6', <SettingOutlined />, [
          getItem('Option 92', '92'),

     ]),
];


import React, { useState, useEffect, useCallback } from 'react';
import { Menu } from 'antd';
import { MenuProps } from 'antd/lib/menu';
import Link from 'next/link';
import { json } from 'stream/consumers';

type NavItem = {
     path: string;
     label?: string;
     key: string;
     children: [];
     type: string;
};

type SidebarProps = {
     className?: string;
};


const convertToItemType = (items: NavItem[]): MenuProps['items'] =>
     items.map((item) => ({
          key: item.key,
          label: item?.label,
          children: item?.children,
          type: item?.type,
     }));

const Sidebar = React.memo(function Sidebar({ className }: SidebarProps) {
     const [navList, setNavList] = useState<NavItem[]>([]);

     const fetchNavList = useCallback(async () => {
          try {
               const response = await fetch('/api/getNavList');
               const { navList } = await response.json();
               setNavList(navList);
          } catch (error) {
               console.error(error);
          }
     }, []);

     useEffect(() => {
          fetchNavList();
     }, [fetchNavList]);

     const menuItems = convertToItemType(navList);





     const maxSidebarWidth = 270;
     const minSidebarWidth = 30;
     // const [menuWidth, setMenuWidth] = useState(maxSidebarWidth);


     const initialValue = JSON.parse(localStorage.getItem('isSidebarToggeld') || 'false');
     const [isSidebarToggeld, setIsToggeld] = useState<boolean>(initialValue);

     const handleToggleSidebar = useCallback(() => {
          setIsToggeld(toggled => {
               const newIsToggeld = !toggled;
               localStorage.setItem('isSidebarToggeld', JSON.stringify(newIsToggeld));
               return newIsToggeld;
          });
     }, []);

     useEffect(() => {
          localStorage.setItem('isSidebarToggeld', JSON.stringify(isSidebarToggeld));
     }, [isSidebarToggeld]);


     const toggleSidebarButtonPosition = isSidebarToggeld ? "left-1" : "left-52";
     return (
          <aside
               className='hidden lg:block border-l transition-all duration-100 relative'
               style={{ width: isSidebarToggeld ? minSidebarWidth : maxSidebarWidth, height: 'calc(100vh - 64px)', background: '#F6F7FB' }}
          >
               <button
                    onClick={() => handleToggleSidebar()}
                    className={`w-6 h-6 absolute bg-white text-slate-500 hover:bg-[#0073ea] transition hover:w-7 hover:text-white  border border-borderColor-secondary  rounded-full justify-center flex place-items-center mx-3  top-2 ${toggleSidebarButtonPosition}`}>
                    {
                         isSidebarToggeld ? < FaChevronRight className='mr-1 text-sm' /> : <FaChevronLeft className='mr-1  text-sm' />
                    }

               </button>
               {!isSidebarToggeld &&

                    <Menu
                         className={`mt-8 ${className}`}
                         onClick={(e) => console.log(e.key)}
                         style={{ background: '#F6F7FB', border: 0 }}
                         mode="vertical"
                         triggerSubMenuAction='click'
                         items={items}

                    />
               }


          </aside>
     );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;