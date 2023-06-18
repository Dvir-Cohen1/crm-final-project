import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  allTasksApi,
  newTaskApi,
  deleteTaskApi,
  getTaskApi,
  getTasksStatusesApi,
  editTaskApi,
  cloneTaskApi,
  uploadTaskAttachmentsApi,
} from "../services/tasks.service";
import { ITaskState } from "@/types/global";
import { message } from "antd";

const initialState: ITaskState = {
  isLoading: false,
  isError: null,
  error: "",
  tasks: [],
  task: {},
  taskStatuses: [],
};

export const allTasks = createAsyncThunk("task/allTasks", async () => {
  const data = await allTasksApi();
  return data;
});
export const getTask = createAsyncThunk("task/getTask", async (values: any) => {
  const data = await getTaskApi(values);
  return data;
});

export const newTask = createAsyncThunk("task/newTask", async (values: any) => {
  const data = await newTaskApi(values);
  return data;
});
export const editTask = createAsyncThunk(
  "task/editTask",
  async (values: any) => {
    const data = await editTaskApi(values);
    return data;
  }
);

export const cloneTask = createAsyncThunk(
  "task/cloneTask",
  async (values: any) => {
    const data = await cloneTaskApi(values);
    return data;
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (taskId: string) => {
    const data = await deleteTaskApi(taskId);
    return data;
  }
);

// Tasks statuses
export const getTasksStatuses = createAsyncThunk(
  "task/getTasksStatuses",
  async () => {
    const data = await getTasksStatusesApi();
    return data;
  }
);

// Upload Task attachments
export const uploadAttachments = createAsyncThunk(
  "task/uploadAttachments",
  async (values: any) => {
    const data = await uploadTaskAttachmentsApi(values);
    return data;
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    // clearMessages: (state, action: PayloadAction<UserState>) => {
    //   setTimeout(() => {
    //     state.isError = null;
    //     state.error = null;
    //     state.isLoading = false;
    //   }, 1000);
    // },
  },
  extraReducers: (builder) => {
    builder
      // Handle Register
      .addCase(allTasks.pending, (state, action) => {
        // state.isLoading = true;
      })
      .addCase(allTasks.rejected, (state, action) => {
        // state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(allTasks.fulfilled, (state, { payload }: any) => {
        message.destroy();
        // state.isLoading = false;
        state.isError = null;
        state.error = "";
        state.tasks = payload;
      })
      .addCase(getTask.pending, (state, action) => {
        // state.isLoading = true;
      })
      .addCase(getTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(getTask.fulfilled, (state, { payload }: any) => {
        message.destroy();
        state.isLoading = false;
        state.isError = null;
        state.error = "";
        state.task = payload;
      })
      .addCase(newTask.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(newTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(newTask.fulfilled, (state, { payload }: any) => {
        message.destroy();
        state.isLoading = false;
        state.isError = false;
        state.error = "Task created!";
        state.task = payload.data;
      })

      .addCase(editTask.pending, (state, action) => {
        // state.isLoading = true;
      })
      .addCase(editTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(editTask.fulfilled, (state, { payload }: any) => {
        message.destroy();
        state.isLoading = false;
        state.isError = null;
        state.error = "Task edited!";
        state.task = payload.data;
      })

      .addCase(cloneTask.pending, (state, action) => {
        // state.isLoading = true;
      })
      .addCase(cloneTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(cloneTask.fulfilled, (state, { payload }: any) => {
        message.destroy();
        state.isLoading = false;
        state.isError = null;
        state.error = "Task Cloned!";
        // console.log(payload.data)
        state.task = payload.data;
      })

      .addCase(deleteTask.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(deleteTask.fulfilled, (state, { payload }: any) => {
        message.destroy();
        state.isLoading = false;
        state.isError = false;
        state.error = "Task deleted!";
        state.task = payload.data;
      })
      // Tasks statuses
      .addCase(getTasksStatuses.pending, (state, action) => {
        // state.isLoading = true;
      })
      .addCase(getTasksStatuses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(getTasksStatuses.fulfilled, (state, { payload }: any) => {
        message.destroy();
        state.isLoading = false;
        state.isError = null;
        state.taskStatuses = payload.data;
      })
      // Upload task attachments
      .addCase(uploadAttachments.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(uploadAttachments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(uploadAttachments.fulfilled, (state, { payload }: any) => {
        message.destroy();
        state.isLoading = false;
        state.isError = null;
        // state.error = "Files uploaded successfully";
        state.task = payload.data;
      });
  },
});

export const {} = taskSlice.actions;

export default taskSlice.reducer;
