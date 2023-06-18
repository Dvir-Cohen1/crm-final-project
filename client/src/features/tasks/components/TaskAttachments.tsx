import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import Image from 'next/image';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { uploadAttachments } from '../redux/taskSlice';



const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });


const TaskAttachments = ({ taskId }: { taskId: string }) => {

  const [files, setFile] = useState<any>([]);
  const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

  function handleFileChange(event: any) {
    setFile([...event.target.files]);
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData(); // Create a new FormData instance
    for (let i = 0; i < files.length; i++) {
      formData.append("attachments", files[i]); // Append each attachment to the FormData
    }
    await dispatch<any>(uploadAttachments({ taskId: taskId, attachments: formData }))
  }

  // const [previewOpen, setPreviewOpen] = useState(false);
  // const [previewImage, setPreviewImage] = useState('');
  // const [previewTitle, setPreviewTitle] = useState('');
  // const [fileList, setFileList] = useState<UploadFile[]>(
  //   [
  //     // {
  //     //   uid: '123123',
  //     //   name: 'image.png',
  //     //   status: 'done',
  //     //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //     // },
  //     // {
  //     //   uid: '1241414',
  //     //   name: 'image.png',
  //     //   status: 'done',
  //     //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //     // },
  //     // {
  //     //   uid: '677867867',
  //     //   name: 'image.png',
  //     //   status: 'done',
  //     //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //     // },

  //   ]);


  // const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();


  // const handleCancel = () => setPreviewOpen(false);

  // const handlePreview = async (file: UploadFile) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj as RcFile);
  //   }

  //   setPreviewImage(file.url || (file.preview as string));
  //   setPreviewOpen(true);
  //   setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  // };



  // const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList }: { fileList: any }) => {
  //   return setFileList(newFileList);
  // }


  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <h1 className='mb-4'>Attachments</h1>




      <form className='text-black' onSubmit={handleSubmit}>
        <input required multiple type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

      {/* <Upload
        name='attachmnets'
        multiple={true}
        customRequest={handleUpload}
        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload> */}



      {/* <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <Image alt="example" width={300} height={300} style={{ width: '100%' }} src={previewImage} />
      </Modal> */}
    </>
  )
}

export default TaskAttachments