import React, { useEffect, useState } from 'react';
import { Avatar, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { MinusOutlined } from '@ant-design/icons';

import { Button } from '@/components/common/Button';
import { InboxOutlined, UnlockOutlined, LockOutlined, DownOutlined, UpOutlined, UpCircleTwoTone, DownCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadProps } from 'antd';
import { ITaskState, IUser, RootState } from '@/types/global';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { allUsers } from '@/features/users/redux/userSlice';
import { getTasksStatuses } from '../redux/taskSlice';
import PrioritySelect from './forms/PrioritySelect';

const { Dragger } = Upload;
const props: UploadProps = {
     name: 'file',
     multiple: true,
     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
     onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
               console.log(info.file, info.fileList);
          }
          if (status === 'done') {
               message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
               message.error(`${info.file.name} file upload failed.`);
          }
     },
     onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
     },
};

const { Option } = Select;

const NewTaskDrawer = ({ open, onClose, onSubmit }: any) => {
     const [form] = Form.useForm();
     const usersState = useSelector((state: RootState) => state.user.users);
     const [users, setUsers] = useState<IUser[]>(usersState || []);
     const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

     // dispatch users for new task options
     useEffect(() => {
          dispatch<any>(allUsers()).then((res: any) => setUsers(res.payload))
     }, [dispatch])

     const { taskStatuses }: ITaskState = useSelector((state: RootState) => state.task);

     // Get all task statuses when component mount
     useEffect(() => {
          dispatch<any>(getTasksStatuses())
     }, [dispatch])

     return (
          <Drawer
               className="resizable-drawer"
               title="Create a new task"
               width={"auto"}
               onClose={onClose}
               open={open}
               bodyStyle={{ paddingBottom: 80 }}
               extra={
                    <Space>
                         <Button fontSize='sm' variant="default" >Manage fields</Button>
                         {/* <Button htmlType="submit" fontSize='sm' >Create</Button> */}
                    </Space>
               }
          >
               <Form layout="vertical" onFinish={onSubmit} form={form}>
                    {/* Title Row */}
                    <Row gutter={16}>
                         <Col span={12}>
                              <Form.Item
                                   name="title"
                                   label="Title"
                                   rules={[{ required: true, message: 'Please enter title' }]}
                              >
                                   <Input placeholder="Please enter title" />
                              </Form.Item>
                         </Col>
                         <Col span={12}>
                              <Form.Item
                                   name="type"
                                   label="Type"
                                   rules={[{ required: true, message: 'Please enter type' }]}
                              >
                                   <Select placeholder="Please choose type">
                                        <Option value="private">
                                             <div className="flex items-center gap-2">
                                                  <LockOutlined />
                                                  Private
                                             </div>
                                        </Option>
                                        <Option value="public">
                                             <div className="flex items-center gap-2">
                                                  <UnlockOutlined />
                                                  Public
                                             </div>
                                        </Option>
                                   </Select>
                              </Form.Item>
                         </Col>
                    </Row>

                    {/* Priority Row */}
                    <Row gutter={16}>
                         <Col span={12}>
                              <PrioritySelect />
                         </Col>
                         <Col span={12}>
                              <Form.Item
                                   name="status"
                                   label="Status"
                                   rules={[{ required: true, message: 'Please select status' }]}
                              >
                                   <Select placeholder="Please select task status">
                                        {taskStatuses?.map((status: any) => {
                                             return (
                                                  <Option key={status._id} value={status._id}>
                                                       <div className="flex items-center gap-2">
                                                            <MinusOutlined style={{ color: status?.color }} />
                                                            {status.label}
                                                       </div>
                                                  </Option>
                                             )
                                        })}
                                   </Select>
                              </Form.Item>
                         </Col>
                    </Row>
                    <Row gutter={16}>
                         <Col span={12}>
                              <Form.Item
                                   name="assignee"
                                   label="Assignee"
                                   rules={[{ required: false, message: 'Please choose the assignee' }]}
                              >
                                   <Select placeholder="Please choose the assignee">
                                        <Option>none</Option>
                                        {users?.map(user => {
                                             return (
                                                  <Option key={user._id} value={user._id}> <Avatar size={20} src={user.imgSRC}> </Avatar> {user.email} </Option>
                                             )
                                        })}
                                   </Select>
                              </Form.Item>
                         </Col>
                    </Row>
                    {/* Followers Row */}
                    <Row gutter={16}>
                         <Col span={12}>
                              <Form.Item
                                   name="followers"
                                   label="Followers"
                                   rules={[{ required: false, message: 'Please choose the followers' }]}
                              >
                                   <Select placeholder="Please choose the followers">
                                        <Option >none</Option>
                                        {users?.map(user => {
                                             return (
                                                  <Option key={user._id} value={user._id}> <Avatar size={20} src={user.imgSRC}> </Avatar> {user.email} </Option>
                                             )
                                        })}
                                   </Select>
                              </Form.Item>
                         </Col>
                         <Col span={12}>
                              <Form.Item
                                   name="due_date"
                                   label="Due date"
                                   rules={[{ required: false, message: 'Please choose the dateTime' }]}
                              >
                                   <DatePicker
                                        // { ...register('due_date') }
                                        style={{ width: '100%' }}
                                        getPopupContainer={(trigger) => trigger.parentElement!}
                                   />
                              </Form.Item>
                         </Col>
                    </Row>
                    {/* Description Row */}
                    <Row gutter={16}>
                         <Col span={24}>
                              <Form.Item
                                   name="description"
                                   label="Description"
                                   rules={[
                                        {
                                             required: false,
                                             message: 'please enter url description',
                                        },
                                   ]}
                              >
                                   <Input.TextArea rows={4} placeholder="please enter url description" />
                              </Form.Item>
                         </Col>
                    </Row>
                    {/* Attachments Row */}
                    <Row gutter={16}>
                         <Col span={24}>
                              <Form.Item
                                   name="attachments"
                                   label="Attachments"
                                   rules={[
                                        {
                                             required: false,
                                             message: 'please enter url description',
                                        },
                                   ]}
                              >
                                   <Dragger {...props}>
                                        <div className="p-5">
                                             <p className="ant-upload-drag-icon">
                                                  <InboxOutlined />
                                             </p>
                                             <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                             <p className="ant-upload-hint">
                                                  Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                                                  banned files.
                                             </p>
                                        </div>
                                   </Dragger>
                              </Form.Item>
                         </Col>
                    </Row>
                    <Button fontSize='sm' htmlType="submit">Create</Button>
               </Form>

          </Drawer>
     )
}

export default NewTaskDrawer