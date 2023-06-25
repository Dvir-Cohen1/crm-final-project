
import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import Image from "next/image";
import { uploadProfileImage } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
     const reader = new FileReader();
     reader.addEventListener('load', () => callback(reader.result as string));
     reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
     if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
     }
     const isLt2M = file.size / 1024 / 1024 < 2;
     if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
     }
     return isJpgOrPng && isLt2M;
};


const UploadFileAvatar = ({ userId }: { userId: string | undefined }) => {

     const dispatch = useDispatch()

     const [loading, setLoading] = useState(false);
     const [imageUrl, setImageUrl] = useState<string>();

     const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
          if (info.file.status === 'uploading') {
               setLoading(true);
               return;
          }
          if (info.file.status === 'done') {
               // Get this url from response in real world.
               getBase64(info.file.originFileObj as RcFile, async(url) => {
                    setLoading(false);
                    setImageUrl(url);
                    await dispatch<any>(uploadProfileImage({ file:url, userId: userId }))
               });

               
          }
     };

     const uploadButton = (
          <div>
               {loading ? <LoadingOutlined /> : <PlusOutlined />}
               <div style={{ marginTop: 8 }}>Upload</div>
          </div>
     );

     return (
          <>
               <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={true}
                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
               >
                    {imageUrl ? <Image width={300} height={300} src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
               </Upload>
          </>
     )
}

export default UploadFileAvatar


