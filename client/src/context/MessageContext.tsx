import { createContext, ReactNode, useCallback, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from '../types/global'; // 
import { message } from "antd";
import { useRouter } from 'next/navigation';

type MessageContextType = {
     showMessage: () => void;
};

const MessageContext = createContext<MessageContextType>({
     showMessage: () => { },
});

export const useMessage = () => useContext(MessageContext);

type MessageProviderProps = {
     children?: ReactNode;
};

export const MessageProvider = ({ children }: MessageProviderProps) => {
     const { isLoading, isError, error } = useSelector((state: RootState) => state.auth || {});
     const { isLoading: isLoadingUser, isError: isErrorUser, error: errorUser } = useSelector((state: RootState) => state.user || {});
     const { isLoading: isLoadingTask, isError: isErrorTask, error: errorTask } = useSelector((state: RootState) => state.task);
     const router = useRouter();

     const showMessage = useCallback((msg?: string) => {

          switch (isError) {
               case true:
                    message.destroy()
                    message.error(error);
                    break;
               case false:
                    message.destroy()
                    message.success(error || "Success");
                    router.push('/authentication/login')
                    break;

               default:
                    break;
          }

          switch (isErrorUser) {
               case true:
                    message.destroy()
                    message.error(errorUser);
                    break;
               case false:
                    message.destroy()
                    message.success(errorUser || "Success");
                    break;

               default:
                    break;
          }

          switch (isErrorTask) {
               case true:
                    message.destroy()
                    message.error(errorTask);
                    break;
               case false:
                    message.destroy()
                    message.success(errorTask || "Success");
                    break;

               default:
                    break;
          }

          setTimeout(() => {
               message.destroy()
          }, 4000);

     }, [isError, error, isErrorUser, errorUser, errorTask, isErrorTask, router]);

     useEffect(() => {

          if (isLoading || isLoadingUser || isLoadingTask && isError === null) {
               message.loading("Loading...");
          } else {
               showMessage();
          }

     }, [isLoading, isLoadingUser, isError, isErrorUser, isLoadingTask]);

     return (
          <MessageContext.Provider value={{ showMessage }}>
               {children}
          </MessageContext.Provider>
     );
};
