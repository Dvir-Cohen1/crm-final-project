import React, { useState } from 'react';
import { PlusOutlined, EllipsisOutlined, DeleteOutlined, CloudDownloadOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Image, Tooltip, Popconfirm } from 'antd';
import { formatDateTimeToString } from '@/utils/date';
import useAttachments from '../hooks/useAttachments';
import { convertFileSizeToKB } from '@/utils/general';
import AttachmetnsTable from './tables/AttachmetnsTable';
import { getLocalStorageItem, setLocalStorageItem } from '@/utils/localstorage';
import { createSubString } from '@/utils/text';
import { downloadAllAttachmentsAsZip } from '../redux/taskSlice';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

const TaskAttachments = ({ taskId, attachments }: { taskId: string; attachments: [] }) => {

  // show all files logic
  const [showAllAttachments, setShowAllAttachments] = useState(false);
  const visibleAttachments = showAllAttachments ? attachments : attachments?.slice(0, 6);
  const remainingAttachmentsCount = attachments?.length - visibleAttachments?.length;
  const handleToggleAttachments = () => {
    setShowAllAttachments(!showAllAttachments);
  };

  // toggle task list view
  const [isListView, setIsListView] = useState(getLocalStorageItem("isListView") || false)

  const handleToggleListView = async () => {
    setIsListView(prev => !prev)
    setLocalStorageItem("isListView", !isListView)
  }

  const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

  const handleDownloadAllAttachmentsAsZip = async () => {
    await dispatch<any>(downloadAllAttachmentsAsZip(taskId))
  }

  // files upload - custom hook
  const { fileInputRef, handleFileChange, handleDeleteAll, handleDeleteOne, handleImageDownload } = useAttachments({ taskId });

  const attachmentsSettingDropDown: MenuProps['items'] = [
    {
      key: '1',
      label: <div onClick={() => handleToggleListView()}>  {isListView ? "Switch to cards view" : "Switch to list view"}</div>,
    },
    {
      key: '2',
      label: (
        <div onClick={() => handleDownloadAllAttachmentsAsZip()}>
          Download all .zip {attachments?.length !== 0 && `(${attachments?.length})`}
        </div>
      ),
    },
    {
      key: '3',
      label:
        <div onClick={() => handleDeleteAll()}>
          Delete all
        </div>,
    },
  ];

  return (
    <>
      <div className="flex justify-between place-items-center mb-2 attachments-setting-dropdown-container">
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
            <Button
              type='text'
              className='font-semibold '
              icon={<PlusOutlined />}
              onClick={() => fileInputRef.current?.click()} // Trigger file input click on button click
            />
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
      {isListView ? <AttachmetnsTable taskId={taskId} attachments={attachments} /> :
        <>
          <div className='attachments-preview-group flex flex-wrap my-4'>
            <Image.PreviewGroup>
              {visibleAttachments?.map((item: any, indexId: any) => (
                <div className='relative attachment-card' key={indexId}>
                  <Tooltip placement='bottom' title={item.name}>
                    <Image className='rounded' width={173} height={100} key={indexId} src={item.path} alt={`task-attachments-${taskId}`} />
                    <div className='attachment-actions-button mt-auto flex absolute gap-2 top-0 right-0 p-2 z-50'>
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
                    <div className="attachment-details-container flex flex-col justify-between">

                      <div className='font-semibold mb-2'>{createSubString(item.name, 0, 22)}</div>

                      <div className='flex justify-between'>
                        <div className='mt-auto'>{formatDateTimeToString(item.createdAt)}</div>
                        <div className="mt-auto">{convertFileSizeToKB(item.size)}KB</div>
                      </div>
                    </div>
                  </Tooltip>
                </div>
              ))}
            </Image.PreviewGroup>
          </div>
          {attachments?.length > 6 && (
            <div>
              <Button onClick={handleToggleAttachments}>
                {showAllAttachments ? 'Hide' : `Show all (${remainingAttachmentsCount})`}
              </Button>
            </div>
          )}
        </>
      }
    </>
  );
};

export default TaskAttachments;
