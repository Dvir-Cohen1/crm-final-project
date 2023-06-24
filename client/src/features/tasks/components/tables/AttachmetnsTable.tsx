import React from 'react'
import { Button, Image, Popconfirm, Space, Table, Tooltip } from 'antd';
import { DeleteOutlined, CloudDownloadOutlined } from '@ant-design/icons';
import useAttachments from '../../hooks/useAttachments';
import { convertFileSizeToKB } from '@/utils/general';
import { formatDateTimeToString } from '@/utils/date';
import { createSubString } from '@/utils/text';
import Link from 'next/link';
const { Column } = Table;

interface DataType {
     key: React.Key;
     name: string;
     createdAt: string;
     uploadedBy: string;
     size: string;
     path: string;
}

const AttachmetnsTable = ({ taskId, attachments }: any) => {
     // files upload - custom hook
     const { handleDeleteOne, handleImageDownload } = useAttachments({ taskId });
     return (
          <Table size='small' dataSource={attachments} pagination={{
               pageSize: 5,
               showSizeChanger: false,
               // You can customize other pagination options as needed
          }}>
               <Column

                    title="Type"
                    key="type"
                    render={(_: any, record: DataType) => (
                         <Image className='rounded' width={40} height={25} src={record.path} alt={record.name} />
                    )}
               />
               <Column
                    width={250}
                    title="File name"
                    key="name"
                    render={(_: any, record: DataType) => (
                         <Tooltip title={record.name}>
                              <Link href={record.path}>
                                   {createSubString(record.name, 0, 30)}
                              </Link>
                         </Tooltip>
                    )}
               />
               <Column title="Uploaded by" dataIndex="uploadedBy" key="uploadedBy" />
               <Column
                    title="Uploaded at"
                    key="createdAt"
                    sorter={((a, b) => {
                         const dateA = new Date(a.createdAt);
                         const dateB = new Date(b.createdAt);
                         return dateA.getTime() - dateB.getTime();
                    })}
                    render={(_: any, record: DataType) => (
                         <>{formatDateTimeToString(record.createdAt)}</>
                    )}

               />
               <Column
                    title="File size"
                    key="size"
                    sorter={((a, b) => +a.size - +b.size)}
                    render={(_: any, record: DataType) => (
                         <>{convertFileSizeToKB(+record.size)}KB</>
                    )}

               />
               <Column
                    title="Action"
                    key="action"
                    render={(_: any, record: DataType) => (
                         <Space size="middle">

                              <div className='attachment-actions-button mt-auto flex gap-2 absolute top-0 right-0 p-2 z-50'>
                                   <Popconfirm
                                        title={`Delete ${record.name}`}
                                        description="Are you sure to delete this attachment?"
                                        onConfirm={() => handleDeleteOne(record.name)}
                                        // onCancel={() => {}}
                                        okText="Yes"
                                        cancelText="No"
                                   >
                                        <Button size='small' type='ghost'>
                                             <DeleteOutlined />
                                        </Button>
                                   </Popconfirm>
                                   <Button size='small' type='ghost' onClick={() => handleImageDownload(record.path, record.name)}>
                                        <CloudDownloadOutlined />
                                   </Button>
                              </div>
                         </Space>
                    )}
               />
          </Table>
     )
}

export default AttachmetnsTable