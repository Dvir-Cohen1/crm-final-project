import React, { useState } from 'react';
import { PlusOutlined, EllipsisOutlined, DeleteOutlined, CloudDownloadOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Image, Tooltip, Popconfirm } from 'antd';
import { formatDateTimeToString } from '@/utils/date';
import useAttachments from '../hooks/useAttachments';
import { convertFileSizeToKB } from '@/utils/general';

const TaskAttachments = ({ taskId, attachments }: { taskId: string; attachments: [] }) => {

  // show all files logic
  const [showAllAttachments, setShowAllAttachments] = useState(false);
  const visibleAttachments = showAllAttachments ? attachments : attachments?.slice(0, 5);
  const remainingAttachmentsCount = attachments?.length - visibleAttachments?.length;
  const handleToggleAttachments = () => {
    setShowAllAttachments(!showAllAttachments);
  };

  // files upload - custom hook
  const { fileInputRef, handleFileChange, handleDeleteAll, handleDeleteOne, handleImageDownload } = useAttachments({ taskId });

  const attachmentsSettingDropDown: MenuProps['items'] = [
    {
      key: '1',
      label: <span>Switch to list view</span>,
    },
    {
      key: '2',
      label: (
        <span>
          Download all .zip {attachments?.length !== 0 && `(${attachments?.length})`}
        </span>
      ),
    },
    {
      key: '3',
      label: <span onClick={() => handleDeleteAll()}>
        Delete all
      
      </span>,
    },
  ];

  return (
    <>
      <div className="flex justify-between place-items-center attachments-setting-dropdown-container">
        <h2 className="mb-4">
          Attachments {attachments?.length !== 0 && `(${attachments?.length})`}
        </h2>
        <div>
          <div className="flex gap-3">
            <Dropdown
              overlayClassName="share-items-dropdown"
              menu={{ items: attachmentsSettingDropDown }}
              placement="bottomRight"
              trigger={['click']}
            >
              <Button type="text" icon={<EllipsisOutlined />} />
            </Dropdown>
            <Button id='upload-attachments' type='text' icon={<label htmlFor="file-upload" className="custom-upload-button"><PlusOutlined style={{ cursor: "pointer" }} /></label>} />
            <input
              id="file-upload"
              ref={fileInputRef}
              type="file"
              multiple
              accept="*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
      <div className='attachments-preview-group flex flex-wrap gap-3 my-4'>
        <Image.PreviewGroup >
          {visibleAttachments?.map((item: any, indexId: any) => (
            <div className='relative attachment-card' key={indexId}>
              <Tooltip placement='bottom' title={item.name}>
                <Image className='rounded' width={200} height={110} key={indexId} src={item.path} alt={`task-attachments-${taskId}`} />
                <div className='attachment-actions-button mt-auto flex gap-2 absolute top-0 right-0 p-2 z-50'>
                  <Popconfirm
                    title={`Delete ${item.name}`}
                    description="Are you sure to delete this attachment?"
                    onConfirm={() => handleDeleteOne(item.name)}
                    // onCancel={() => {}}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button size='small' type='ghost'>
                      <DeleteOutlined />
                    </Button>
                  </Popconfirm>
                  <Button size='small' type='ghost' onClick={() => handleImageDownload(item.path, item.name)}>
                    <CloudDownloadOutlined />
                  </Button>
                </div>
                <div className="attachment-details-container flex justify-between">
                  <div className='flex flex-col'>
                    <div className='font-semibold mb-2'>{item.name}</div>
                    <div>{formatDateTimeToString(item.createdAt)}</div>
                  </div>
                  <div className="mt-auto">{convertFileSizeToKB(item.size)}KB</div>
                </div>
              </Tooltip>
            </div>
          ))}
        </Image.PreviewGroup>
      </div>
      {attachments?.length > 5 && (
        <div>
          <Button onClick={handleToggleAttachments}>
            {showAllAttachments ? 'Hide' : `Show all (${remainingAttachmentsCount})`}
          </Button>
        </div>
      )}
    </>
  );
};

export default TaskAttachments;
