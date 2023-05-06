import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  allTasksApi,
  newTaskApi,
  deleteTaskApi,
  getTaskApi,
} from "../services/tasks.service";
import { ITaskState } from "@/types/global";

const initialState: ITaskState = {
  isLoading: false,
  isError: null,
  error: "",
  tasks: [],
  task: {},
};

export const allTasks = createAsyncThunk("task/allTasks", async () => {
  const data = await allTasksApi();
  console.log(data);
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

export const deleteTask = createAsyncThunk(
  "user/deleteTask",
  async (userId: string) => {
    const data = await deleteTaskApi(userId);
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
        state.isLoading = true;
      })
      .addCase(allTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(allTasks.fulfilled, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = null;
        state.error = "";
        state.tasks = payload;
      })
      .addCase(getTask.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(getTask.fulfilled, (state, { payload }: any) => {
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
        state.isLoading = false;
        state.isError = false;
        state.error = "Task created!";
        state.task = payload.data;
        // state.task = payload.data;
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
        state.isLoading = false;
        state.isError = false;
        state.error = "Task deleted!";
        state.task = payload.data;
        // state.task = payload.data;
      });
  },
});

export const {} = taskSlice.actions;

export default taskSlice.reducer;