import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUser } from "../services/users.service";

interface UserState {
  username: string;
  email: string;
}

const initialState: UserState = {
  username: "",
  email: "",
};

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (values: string) => {
    const data = await getUser(values);
    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    clearUser: (state) => {
      state.username = "";
      state.email = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle Register
      .addCase(getUserById.pending, (state, action) => {})
      .addCase(getUserById.rejected, (state, action) => {})
      .addCase(getUserById.fulfilled, (state, { payload }: any) => {});
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
