import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { deleteAllTaskAttachments, deleteOneTaskAttachment, uploadAttachments } from '../redux/taskSlice';

const useAttachments = ({ taskId }: { taskId: string }) => {
  const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Set files
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileList = Array.from(event.target.files);
      setFiles(fileList);
    }
  };

  // Delete all files
  const handleDeleteAll = async () => {
    await dispatch<any>(deleteAllTaskAttachments({ taskId }));
  };

  // Delete one file
  const handleDeleteOne = async (fileName: string) => {
    await dispatch<any>(deleteOneTaskAttachment({ taskId, fileName }));
  };

  // Download file
  const handleImageDownload = async (imageUrl: string, imageName: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = imageName;
      link.click();

      URL.revokeObjectURL(url); // Release the temporary URL resource
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  // Upload files
  useEffect(() => {
    const handleUpload = async () => {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('attachments', files[i]);
      }
      await dispatch<any>(uploadAttachments({ taskId: taskId, attachments: formData }));
    };

    if (files.length > 0) {
      handleUpload();
    }
  }, [files, dispatch]);

  // Expose necessary functions and data
  return {
    fileInputRef,
    handleFileChange,
    handleDeleteAll,
    handleDeleteOne,
    handleImageDownload
  };
};

export default useAttachments