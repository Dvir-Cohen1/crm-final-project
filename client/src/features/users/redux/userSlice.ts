import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addNewUser,
  deleteUserById,
  getAllUsers,
  getUser,
  uploadProfileImageApi,
} from "../services/users.service";
import { UserState } from "@/types/global";

// interface UserState {
//   users: [];
// }

const initialState: UserState = {
  isLoading: false,
  isError: null,
  error: "",
  users: [],
  user: null,
};

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (values: string) => {
    const data = await getUser(values);
    return data;
  }
);

export const allUsers = createAsyncThunk("user/allUsers", async () => {
  const data = await getAllUsers();
  return data;
});

export const addUser = createAsyncThunk("user/addUser", async (values: {}) => {
  const data = await addNewUser(values);
  return data;
});

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId: string) => {
    const data = await deleteUserById(userId);
    return data;
  }
);
// export const uploadProfileImage = createAsyncThunk(
//   "user/uploadProfileImage",
//   async (profileImage: Object) => {
//     const data = await uploadProfileImageApi(profileImage);
//     return data;
//   }
// );

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle Register
      .addCase(allUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(allUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(allUsers.fulfilled, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = null;
        state.error = "";
        state.users = payload;
      })
      .addCase(getUserById.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(getUserById.fulfilled, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = null;
        state.error = "";
        state.user = payload;
      })
      .addCase(addUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "user Created";
        state.user = payload;
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "User Deleted";
        state.user = payload;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
