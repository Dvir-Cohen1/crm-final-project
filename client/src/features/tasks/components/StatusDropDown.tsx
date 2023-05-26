import React from 'react'
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space, Tooltip } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { capitalizeFirstLetters } from '@/utils/text';

const StatusDropDown = ({ status }: { status: string }) => {
     const items: MenuProps['items'] = [
          {
               key: '1',
               label: (
                    <>
                         {capitalizeFirstLetters("to do")}
                    </>
               ),
          },
          {
               key: '2',
               label: (
                    <>
                         {capitalizeFirstLetters("in progress")}
                    </>
               ),
          },
          {
               key: '3',
               label: (
                    <>
                         {capitalizeFirstLetters("done")}
                    </>
               ),
          },
     ];

     return (
          <Space className='mx-2' wrap>
               <Tooltip title="status">
                    <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
                         <Button className='font-semibold' type='primary'>{capitalizeFirstLetters(status) || "Status"} <CaretDownOutlined /></Button>
                    </Dropdown>
               </Tooltip>
          </Space>
     )
}

export default StatusDropDown