import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { getItem } from '@/utils/general';
import React, { useState, useEffect, useCallback } from 'react';
import { Menu } from 'antd';
import { MenuProps } from 'antd/lib/menu';
import NextLink from 'next/link';
import { json } from 'stream/consumers';


type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
     getItem((<NextLink href={"/projects/project"}>Projects</NextLink>), 'sub1', <MailOutlined />),

     getItem((<NextLink href={"/tasks"}>Tasks</NextLink>), 'sub2', <AppstoreOutlined />),

     getItem((<NextLink href={"/users"}>Users</NextLink>), 'sub4', <UserOutlined />
          // [
          //      getItem((<NextLink href={"/users"}>All Users</NextLink>), '4'),
          //      getItem((<NextLink href={"/users/newUser"}>New User</NextLink>), '5'),
          //      getItem((<NextLink href={"/users/1"}>Departments</NextLink>), '6'),

          // ]
     ),
     getItem((<NextLink href={"/customers"}>Customers</NextLink>), 'sub5', <CalendarOutlined />),
     // getItem('Customers', 'sub5', <CalendarOutlined />, [
     //      getItem((<NextLink href={"/customers"}>All Customers</NextLink>), 'allCustomers'),
     //      getItem((<NextLink href={"/customers/newCustomer"}>New Customer</NextLink>), 'newCustomer'),
     // ]),
];


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
               className='hidden lg:block border-r border-[#091e4224] transition-all duration-100 relative'
               style={{ width: isSidebarToggeld ? minSidebarWidth : maxSidebarWidth, height: 'auto' }}
          >
               <button
                    onClick={() => handleToggleSidebar()}
                    className={`w-6 h-6 absolute bg-white text-slate-500 hover:bg-[#0073ea] transition hover:w-7 hover:text-white  border border-[#091e4224]  rounded-full justify-center flex place-items-center mx-3  top-2 ${toggleSidebarButtonPosition}`}>
                    {
                         isSidebarToggeld ? < FaChevronRight className='mr-1 text-sm' /> : <FaChevronLeft className='mr-1  text-sm' />
                    }

               </button>
               {!isSidebarToggeld &&

                    <Menu
                         className={`mt-8 ${className}`}
                         // onClick={(e) => console.log(e.key)}
                         style={{ border: 0 }}
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