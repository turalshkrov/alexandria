import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ListType, ReviewType, UserType } from "@/types";
import http from "@/api/api";

interface UserState {
  user: UserType | null,
  lists: ListType[] | null,
  selectedList: string | null,
  selectedBook: string | null,
  reviews: ReviewType[] | null,
  isLoading: boolean,
  error: unknown,
}

const initialState: UserState = {
  user: null,
  lists: null,
  selectedList: null,
  selectedBook: null,
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
    setSelectedList: (state, action) => {
      state.selectedList = action.payload;
    },
    setSelectedBook: (state, action) => {
      const bookId = action.payload;
      state.selectedBook = bookId;
    },
    updateListBooksOnUI: (state, action) => {
      const listId = action.payload.listId;
      let list = state.lists?.find(list => list._id === listId);
      if (list) list = action.payload.list;
      state.lists = state.lists?.filter(list => list._id !== listId) || state.lists;
      if (list) state.lists?.push(list);
    },
    removeListFromSlice: (state, action) => {
      const listId = action.payload;
      state.lists = state.lists?.filter(list => list._id !== listId) || state.lists;
    },
    updateListOnUi: (state, action) => {
      const listId = action.payload.id;
      const list = state.lists?.find(list => list._id === listId);
      if (list) list.title = action.payload.title;
      state.lists = state.lists?.filter(list => list._id !== listId) || state.lists;
      if (list) state.lists?.push(list);
    },
    updateProfileOnUI: (state, action) => {
      if (state.user) { 
        state.user.name = action.payload.name;
        state.user.username = action.payload.username;
        state.user.profileImage = action.payload.profileImage;
        state.user.location = action.payload.location;
      }
    },
    updateBookReviewOnUI: (state, action) => {
      if (state.reviews) {
        const review = state.reviews.find(review => review.book === action.payload.book);
        if (review) {
          review.rating = action.payload.review.rating;
          review.content = action.payload.review.content;
          review.title = action.payload.review.title;
          state.reviews = [ ...state.reviews.filter(review => review.book !== action.payload.book), review ]
        }
      }
    },
    addFavoriteBookOnUI: (state, action) => {
      const book = action.payload;
      state.user?.favoriteBooks.push(book);
    },
    removeFavoriteBookOnUI: (state, action) => {
      const id = action.payload;
      if (state.user) state.user.favoriteBooks = state.user?.favoriteBooks.filter(book => book._id !== id);
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
export const { addNewListToUI, setSelectedList, setSelectedBook, removeListFromSlice, updateListBooksOnUI, updateListOnUi, updateProfileOnUI, updateBookReviewOnUI, addFavoriteBookOnUI, removeFavoriteBookOnUI } = userSlice.actions;