import { useSelector } from 'react-redux';
import { RootState } from '../types/global'; // Replace this with the actual path to your RootState interface
import { message } from 'antd';
import { useRouter } from 'next/navigation';

const useGlobalMessage = () => {
     const isLoading = useSelector((state: RootState) => state.auth.isLoading);
     const isError = useSelector((state: RootState) => state.auth.isError);
     const error = useSelector((state: RootState) => state.auth.error);
     const router = useRouter();

     const showMessage = (messageText?: string) => {
          // if (isLoading) {
          //      message.loading("הפעולה מתבעצת");
          // }
           if (isError) {
               message.error(error);
          } else if (!isError) {
               message.success("פעולה בוצעה בהצלחה");
               router.push('/authentication/login')
          }

     };

     return showMessage;
};

export default useGlobalMessage;
