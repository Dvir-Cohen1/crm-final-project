import type { DatePickerProps } from 'antd';
import { ConfigProvider, DatePicker, Space } from 'antd';
import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

const EditDueDate = ({ dueDate, handleEditTask }: { dueDate: string, handleEditTask: Function }) => {

     const onChange: DatePickerProps['onChange'] = async (date, dateString) => {
          await handleEditTask(date?.toString(), "due_date")
     };

     return (
          <Space direction="vertical" style={{ width: '100%' }}>
               <DatePicker
                    placement='bottomRight'
                    className='edit-task-dueDatePicker'
                    bordered={false}
                    placeholder="None"
                    defaultValue={dayjs(dueDate, 'YYYY-MM-DD')}
                    onChange={onChange}
                    format="DD-MM-YYYY"
               />
          </Space>
     )
}

export default EditDueDate