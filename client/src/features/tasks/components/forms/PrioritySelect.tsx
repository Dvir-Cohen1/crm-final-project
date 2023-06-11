import React from 'react'

import { Form, Select } from 'antd';

import { UpCircleTwoTone, DownCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';

const PrioritySelect = ({showLabel = true, required = true}) => {
     const { Option } = Select;
     return (
          <Form.Item
               name="priority"
               label={showLabel && 'Priority'}
               rules={[{ required: required, message: 'Please select priority' }]}
          >
               <Select defaultValue={'medium'}>
                    <Option value="high">
                         <div className="flex gap-2">
                              {/* <img className="sc-19ime50-1 jPnJkx" src="https://dvircohen.atlassian.net/images/icons/priorities/high.svg" width="16px" height="16px" /> */}

                              <UpCircleTwoTone twoToneColor={'#FF5630'} style={{ fontSize: '16px' }} />
                              High
                         </div>

                    </Option>
                    <Option value="medium">
                         <div className="flex gap-2">
                              <MinusCircleTwoTone twoToneColor={'#FFAB00'} style={{ fontSize: '16px' }} />
                              {/* <img className="sc-19ime50-1 jPnJkx" src="https://dvircohen.atlassian.net/images/icons/priorities/medium.svg" width="16px" height="16px" /> */}
                              Medium
                         </div>

                    </Option>
                    <Option value="low">
                         <div className="flex gap-2">
                              {/* <img className="sc-19ime50-1 jPnJkx" src="https://dvircohen.atlassian.net/images/icons/priorities/low.svg" width="16px" height="16px" /> */}

                              <DownCircleTwoTone twoToneColor={'#2684FF'} style={{ fontSize: '16px' }} />
                              Low
                         </div>

                    </Option>
               </Select>
          </Form.Item>
     )
}

export default PrioritySelect