import http from "@/api/api";
import { UserType } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UsersSliceState {
  users: UserType[] | null,
  selected: UserType | null,
  isLoading: boolean,
  error: unknown
}

const initialState: UsersSliceState = {
  users: null,
  selected: null,
  isLoading: false,
  error: null
}

export const getUsers = createAsyncThunk(
  'users/get',
  async () => {
    const response = await http.get('/users/all');
    return response.data;
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selected = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, state => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
  }
});

export default usersSlice.reducer;
export const { setSelectedUser } = usersSlice.actions;