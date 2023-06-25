import React, { useRef, useState, useEffect } from "react";

const useAttachmentsUpload = (onUpload: (files: File[]) => Promise<void>) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleButtonClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const fileList = Array.from(event.target.files);
      setFiles(fileList);
    }
  }

  async function handleUpload() {
    if (files.length > 0) {
      await onUpload(files);
    }
  }

  useEffect(() => {
    handleUpload();
  }, [files, onUpload]);

  return {
    fileInputRef,
    handleButtonClick,
    handleFileChange,
  };
};

export default useAttachmentsUpload;
