import React from 'react';
import { Select } from 'antd';
import { UpCircleTwoTone, DownCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';

const EditPrioritySelect = ({ defaultValue = 'low', handleEditTask }: { defaultValue: string, handleEditTask: Function }) => {

     const onChange = async (e: any) => {
          await handleEditTask(e, true)
     };

     return (
          <div className='edit-priority-select'>
               <Select
                    defaultValue={defaultValue}
                    className='edit-priority-select'
                    placeholder="Select a person"
                    onChange={onChange}
                    // onSearch={onSearch}
                    options={[
                         {
                              value: 'high',
                              name: 'test',
                              label: (
                                   <div className="flex gap-2">
                                        <UpCircleTwoTone twoToneColor={'#FF5630'} style={{ fontSize: '16px' }} />
                                        High
                                   </div>
                              ),
                         },
                         {
                              value: 'medium',
                              label: (
                                   <div className="flex gap-2">
                                        <MinusCircleTwoTone twoToneColor={'#FFAB00'} style={{ fontSize: '16px' }} />
                                        Medium
                                   </div>
                              ),
                         },
                         {
                              value: 'low',
                              label: (
                                   <div className="flex gap-2">
                                        <DownCircleTwoTone twoToneColor={'#2684FF'} style={{ fontSize: '16px' }} />
                                        Low
                                   </div>
                              ),
                         },
                    ]}
               />
          </div>
     );
};

export default EditPrioritySelect;