import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ListType, UserType } from "@/types";
import http from "@/api/api";

interface UserState {
  user: UserType | null,
  lists: ListType[] | null,
  isLoading: boolean,
  error: unknown,
}

const initialState: UserState = {
  user: null,
  lists: null,
  isLoading: false,
  error: null,
}

export const getMe = createAsyncThunk(
  'user/getMe',
  async (userId: string) => {
    const response = await http.get(`users/${userId}`);
    return response.data;
  }
);

export const getMyLists = createAsyncThunk(
  'user/getMyLists',
  async (userId: string) => {
    const response = await http.get(`users/${userId}/lists`);
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMe.pending, state => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading;
        state.error = action.error.message;
      })
      .addCase(getMyLists.pending, state => {
        state.isLoading = true;
      })
      .addCase(getMyLists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lists = action.payload;
      })
      .addCase(getMyLists.rejected, (state, action) => {
        state.isLoading;
        state.error = action.error.message;
      })
  }
});

export default userSlice.reducer;