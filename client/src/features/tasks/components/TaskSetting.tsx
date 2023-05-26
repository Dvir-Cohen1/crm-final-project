
import React from 'react'

import { Button, Dropdown, Space, Tooltip } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { capitalizeFirstLetters } from '@/utils/text';
import { EllipsisOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
const TaskSetting = () => {
     const items: MenuProps['items'] = [
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
                    <>
                         Clone
                    </>
               ),
          },
          {
               key: '3',
               label: (
                    <>
                         Delete
                    </>
               ),
          },
          {
               type: 'divider',
          },
          {
               key: '4',
               label: (
                    <>
                         Print
                    </>
               ),
          },
     ];
     return (
          <Space wrap>
               <Tooltip title="status">
                    <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
                         <Button type="default" className='font-semibold' icon={<EllipsisOutlined />} />
                    </Dropdown>
               </Tooltip>
          </Space>
     )
}

export default TaskSetting