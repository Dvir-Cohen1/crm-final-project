
type MenuItem = Required<MenuProps>['items'][number];
import type { MenuProps } from 'antd';



export function getItem(
     label: React.ReactNode,
     key?: React.Key | null,
     icon?: React.ReactNode,
     children?: MenuItem[],
     type?: 'group',
): MenuItem {
     return {
          key,
          icon,
          children,
          label,
          type,
     } as MenuItem;
}

