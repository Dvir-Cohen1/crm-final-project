import React, { ReactNode } from 'react'
import type { MenuProps } from 'antd';
import { Dropdown, theme } from 'antd';


const items: MenuProps['items'] = [
     {
          label: '1st menu item',
          key: '1',
     },
     {
          label: '2nd menu item',
          key: '2',
     },
     {
          label: '3rd menu item',
          key: '3',
     },
];

type ContextAdminMenuProps = {
     children?: ReactNode
}

const ContextAdminMenu = ({ children }: ContextAdminMenuProps) => {
     return (
          <Dropdown menu={{ items }} trigger={['contextMenu']}>
               {children}
          </Dropdown>
     )
}

export default ContextAdminMenu