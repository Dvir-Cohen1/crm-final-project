import React, { useRef, useState, useEffect } from 'react';
import { PlusOutlined, EllipsisOutlined, DeleteOutlined, CloudDownloadOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Image } from 'antd';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { deleteAllTaskAttachments, uploadAttachments } from '../redux/taskSlice';
import { formatDateTimeToString } from '@/utils/date';

const TaskAttachments = ({ taskId, attachments }: { taskId: string; attachments: [] }) => {
  const attachmentsCount = attachments?.length

  const [files, setFiles] = useState<File[]>([]);
  const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const fileList = Array.from(event.target.files);
      setFiles(fileList);
    }
  }

  async function handleUpload() {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('attachments', files[i]);
    }
    await dispatch<any>(uploadAttachments({ taskId: taskId, attachments: formData }));
  }

  async function handleDeleteAll() {
    await dispatch<any>(deleteAllTaskAttachments({ taskId: taskId }));
  }

  useEffect(() => {
    if (files.length > 0) {
      handleUpload();
    }
  }, [files]);

  const attachmentsSettingDropDown: MenuProps['items'] = [
    {
      key: '1',
      label: <span>Switch to list view</span>,
    },
    {
      key: '2',
      label: (
        <span>
          Download all .zip {attachmentsCount !== 0 && `(${attachmentsCount})`}
        </span>
      ),
    },
    {
      key: '3',
      label: <span onClick={() => handleDeleteAll()}>Delete all</span>,
    },
  ];

  return (
    <>
      <div className="flex justify-between place-items-center attachments-setting-dropdown-container">
        <h2 className="mb-4">
          Attachments {attachmentsCount !== 0 && `(${attachmentsCount})`}
        </h2>
        <div>
          <span className="flex gap-3">
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
          </span>
        </div>
      </div>
      <div className='attachments-preview-group flex flex-wrap gap-3 my-4'>
        <Image.PreviewGroup >
          {attachments?.map((item: any, indexId: any) => (
            <div className='relative attachment-card' key={indexId}>
              <Image className='rounded' width={200} height={110} key={indexId} src={item.path} alt={`task-attachments-${taskId}`} />

              <div className='attachment-actions-button mt-auto flex gap-2 absolute top-0 right-0 p-2 z-50'>
                <Button size='small' type='ghost'>
                  <DeleteOutlined />
                </Button>
                <Button size='small' type='ghost'>
                  <CloudDownloadOutlined />
                </Button>
              </div>
              <div className="attachment-details-container">
                <div className='font-semibold'>{item.name}</div>
                <div>{formatDateTimeToString(item.createdAt)}</div>
              </div>
            </div>
          ))}
        </Image.PreviewGroup>
      </div>
    </>
  );
};

export default TaskAttachments;
