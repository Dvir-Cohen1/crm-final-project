import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editTask, getTask } from '@/features/tasks/redux/taskSlice'; // Replace with your actual task actions
import { AuthState, ITaskState, RootState } from '@/types/global';

const useEditTask = () => {
  const dispatch = useDispatch();

  // Get the task state from redux slices
  const { task }: ITaskState = useSelector((state: RootState) => state.task);

  // Get logged in user state from redux slices
  const { user }: AuthState = useSelector((state: RootState) => state.auth);

  const handleEditTask = useCallback(async (e: React.KeyboardEvent<HTMLInputElement>, fieldName?: string) => {
    let inputName: string;
    let inputValue: any;
    switch (fieldName) {
      case 'priority':
        inputName = 'priority';
        inputValue = e;
        break;
      case 'type':
        inputName = 'type';
        inputValue = e;
        break;
      case 'assignee':
        inputName = 'assignee';
        if (e === null) {
          inputValue = [];
        } else {
          inputValue = e;
        }
        break;
      case 'followers':
        inputName = 'followers';
        if (e === null) {
          inputValue = task?.followers.filter((obj: any) => obj._id !== user?._id);
        } else {
          inputValue = [...task?.followers, e];
        }
        break;
      case 'due_date':
        inputName = 'due_date';
        inputValue = e;
        break;
      default:
        inputName = e.currentTarget?.name;
        inputValue = e.currentTarget?.value;
        if (!inputName || !inputValue || String(inputValue).length <= 3) return;
        break;
    }

    const taskData = {
      [inputName]: inputValue,
    };

    await dispatch<any>(editTask({ taskId: task._id, taskData }));
    await dispatch<any>(getTask(task._id));
    // message.destroy()
  }, [dispatch, task, user]);

  useEffect(() => {
    // Optionally include any additional cleanup or side effects
    // that you may need for your custom hook

    return () => {
      // Cleanup code (if necessary) when the component unmounts
    };
  }, []);

  return { handleEditTask };
};

export default useEditTask;
