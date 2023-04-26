import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addNewUser, getAllUsers, getUser } from "../services/users.service";
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // setUser: (state, action: PayloadAction<UserState>) => {
    //   state.username = action.payload.username;
    //   state.email = action.payload.email;
    // },
    // clearUser: (state) => {
    //   state.username = "";
    //   state.email = "";
    // },
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
        state.isError = false;
        state.error = "";
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
        state.isError = false;
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
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
