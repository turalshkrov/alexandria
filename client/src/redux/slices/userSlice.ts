import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ListType, ReviewType, UserType } from "@/types";
import http from "@/api/api";

interface UserState {
  user: UserType | null,
  lists: ListType[] | null,
  selectedList: string | null,
  reviews: ReviewType[] | null,
  isLoading: boolean,
  error: unknown,
}

const initialState: UserState = {
  user: null,
  lists: null,
  selectedList: null,
  reviews: null,
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

export const getMyReviews = createAsyncThunk(
  'user/getMyReviews',
  async (userId: string) => {
    const response = await http.get(`users/${userId}/reviews`);
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addNewListToUI: (state, action) => {
      const list = action.payload.list;
      list.user = state.user;
      state.lists?.push(list);
    },
    removeListFromUI: (state, action) => {
      const listId = action.payload;
      state.lists = state.lists?.filter(list => list._id !== listId) || state.lists;
    },
    setSelectedList: (state, action) => {
      state.selectedList = action.payload;
    }
  },
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
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getMyReviews.pending, state => {
        state.isLoading = true;
      })
      .addCase(getMyReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload;
      })
      .addCase(getMyReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
  }
});

export default userSlice.reducer;
export const { addNewListToUI, setSelectedList, removeListFromUI } = userSlice.actions;