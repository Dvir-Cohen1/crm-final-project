
import React from 'react'
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import { capitalizeFirstLetters } from '@/utils/text';

const TypeTags = ({ type, handleEditTask }: { type: string, handleEditTask: Function }) => {

     const icon = type === "public" ? <UnlockOutlined /> : <LockOutlined />

     return (
          <span className='text-sm'>
               <Tooltip title={capitalizeFirstLetters(type) + ' task'}>
                    <Button
                         onClick={(e) => handleEditTask(type === "public" ? "private" : "public", "type")}
                         className='mb-4'
                         type="text"
                         shape="circle"
                         icon={icon}
                    />
               </Tooltip>
          </span>

     )
}

export default TypeTags