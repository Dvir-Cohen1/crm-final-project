import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addNewUser,
  deleteProfileImageApi,
  deleteUserById,
  editUserApi,
  getAllUsers,
  getUser,
  pinItemApi,
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
export const uploadProfileImage = createAsyncThunk(
  "user/uploadProfileImage",
  async ({
    file,
    userId,
  }: {
    file: string | undefined;
    userId: string | undefined;
  }) => {
    const data = await uploadProfileImageApi(file, userId);
    return data;
  }
);
export const deleteProfileImage = createAsyncThunk(
  "user/deleteProfileImage",
  async ({ userId }: { userId: string | undefined }) => {
    const data = await deleteProfileImageApi(userId);
    return data;
  }
);

export const editUser = createAsyncThunk(
  "user/editUser",
  async ({ data, userId }: any) => {
    const response = await editUserApi(data, userId);
    return response;
  }
);
export const pinItem = createAsyncThunk(
  "user/pinItem",
  async (itemId: string) => {
    const response = await pinItemApi(itemId);
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
    },
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
      //
      // Get all users
      //
      .addCase(allUsers.pending, (state, action) => {
        // state.isLoading = true;
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
      //
      // Get user
      //
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
      //
      // Create user
      //
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
        state.error = "User Created";
        state.user = payload;
      })
      //
      // Delete user
      //
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
      })
      //
      // Edit user
      //
      .addCase(editUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(editUser.fulfilled, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "User updated";
        state.user = payload.data;
      })
      //
      // Upload profile image
      //
      .addCase(uploadProfileImage.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(uploadProfileImage.fulfilled, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "Profile image updated";
        state.user = payload.data;
      })
      //
      // Delete profile image
      //
      .addCase(deleteProfileImage.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteProfileImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(deleteProfileImage.fulfilled, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "Profile image deleted";
        state.user = payload.data;
      })
      //
      // Pin item
      //
      .addCase(pinItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(pinItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(pinItem.fulfilled, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = false;
        state.error = payload.message;
        state.user = payload.data;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
