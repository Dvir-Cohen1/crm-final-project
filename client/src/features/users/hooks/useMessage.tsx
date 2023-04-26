import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { RootState } from '@/types/global';
import router from 'next/router';

// interface MessageState {
//   isLoading: boolean;
//   isError: boolean;
//   error: string | null;
// }

// const getMessageState = (state: RootState): MessageState => ({
//   isLoading: state.user?.isLoading || false,
//   isError: state.user?.isError || false,
//   error: state.user?.error || null,
// });

export const useMessage = () => {
//   const { isLoading, isError, error } = useSelector(getMessageState);
const { isLoading, isError, error } = useSelector((state: RootState) => state.user || {});

  const showMessage = useCallback((msg?: string) => {
    switch (isError) {
      case true:
        message.error(error);
        break;
      case false:
        message.success(error || 'Success');
        // router.push('/authentication/login')
        break;
      default:
        break;
    }
  }, [isError, error]);

  useEffect(() => {
    if (isLoading) {
      message.loading('Loading...');
    } else {
      message.destroy();
      showMessage();
    }
  }, [isLoading, isError, showMessage]);

  return { isLoading, isError, error };
};
