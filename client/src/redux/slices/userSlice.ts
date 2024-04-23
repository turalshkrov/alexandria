import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReviewType, UserType } from "@/types";
import http from "@/api/api";

interface UserState {
  user: UserType | null,
  role: string | null,
  reviews: ReviewType[] | null,
  isLoading: boolean,
  error: unknown,
}

interface UpdateProfileData {
  name?: string,
  username?: string,
  location?: string,
  profileImage?: string
}

interface AddReviewData {
  id: string,
  title?: string,
  content?: string,
  rating?: number
}

const initialState: UserState = {
  user: null,
  role: null,
  reviews: null,
  isLoading: false,
  error: null,
}

export const getMe = createAsyncThunk(
  'user/getMe',
  async () => {
    const response = await http.get(`auth/getMe`)
      .then(response => response)
      .catch(error => {
        throw new Error(error.response.data.message);
      })
    return response.data;
  }
);

export const getMyReviews = createAsyncThunk(
  'user/getMyReviews',
  async (userId: string) => {
    const response = await http.get(`users/${userId}/reviews`)
      .then(response => response)
      .catch(error => {
        throw new Error(error.response.data.message);
      })
    return response.data;
  }
);

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (data: UpdateProfileData) => {
    const response = await http.patch(`/users/update`, data)
      .then(response => response)
      .catch(error => {
        throw new Error(error.response.data.message);
      })
    return response.data;
  }
);

export const addFavoriteBook = createAsyncThunk(
  'user/addFavoriteBook',
  async (bookId: string) => {
    if (bookId.length !== 24) throw new Error('Id is not valid');
    const response = await http.patch(`/users/add-favorite-books`, { bookId })
      .then(response => response)
      .catch(error => {
        throw new Error(error.response.data.message);
      })
    return response.data;
  }
);

export const removeFavoriteBook = createAsyncThunk(
  'user/removeFavoriteBook',
  async (bookId: string) => {
    if (bookId.length !== 24) throw new Error('Id is not valid');
    const response = await http.patch(`/users/remove-favorite-books`, { bookId })
      .then(response => response)
      .catch(error => {
        throw new Error(error.response.data.message);
      })
    return response.data;
  }
);

export const addFavoriteAuthor = createAsyncThunk(
  'user/addFavoriteAuthor',
  async (authorId: string) => {
    if (authorId.length !== 24) throw new Error('Id is not valid');
    const response = await http.patch(`/users/add-favorite-authors`, { authorId })
      .then(response => response)
      .catch(error => {
        throw new Error(error.response.data.message);
      })
    return response.data;
  }
);

export const removeFavoriteAuthor = createAsyncThunk(
  'user/removeFavoriteAuthor',
  async (authorId: string) => {
    if (authorId.length !== 24) throw new Error('Id is not valid');
    const response = await http.patch(`/users/remove-favorite-authors`, { authorId })
      .then(response => response)
      .catch(error => {
        throw new Error(error.response.data.message);
      })
    return response.data;
  }
);

export const addReview = createAsyncThunk(
  'user/addReview',
  async (data: AddReviewData) => {
    const response = await http.post(`/books/${data.id}/reviews/add`, data)
      .then(response => response)
      .catch(error => {
        throw new Error(error.response.data.message);
      })
    return response.data.review;
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateBookReviewOnUI: (state, action) => {
      if (state.reviews) {
        const review = state.reviews.find(review => review.book === action.payload.book);
        if (review) {
          review.rating = action.payload.review.rating;
          review.content = action.payload.review.content;
          review.title = action.payload.review.title;
          state.reviews = [...state.reviews.filter(review => review.book !== action.payload.book), review]
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMe.pending, state => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.role = action.payload.role;
        state.error = null;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading;
        state.error = action.error.message;
      })
      .addCase(getMyReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addFavoriteBook.fulfilled, (state, action) => {
        state.user?.favoriteBooks.push(action.payload.book);
      })
      .addCase(removeFavoriteBook.fulfilled, (state, action) => {
        if (state.user) state.user.favoriteBooks = state.user?.favoriteBooks.filter(book => book._id !== action.payload.book._id);
      })
      .addCase(addFavoriteAuthor.fulfilled, (state, action) => {
        state.user?.favoriteAuthors.push(action.payload.author);
      })
      .addCase(removeFavoriteAuthor.fulfilled, (state, action) => {
        if (state.user) state.user.favoriteAuthors = state.user?.favoriteAuthors.filter(author => author._id !== action.payload.author._id);
      })
      .addCase(addReview.fulfilled, (state, action) => {
        const review = state.reviews?.find(review => review._id === action.payload._id);
        if (review) {
          review.rating = action.payload.rating;
          review.content = action.payload.content;
          review.title = action.payload.title;
          if (state.reviews) state.reviews = [...state.reviews.filter(review => review._id !== action.payload._id), review];
        } else {
          state.reviews?.push(action.payload);
        }
      })
  }
});

export default userSlice.reducer;
export const { updateBookReviewOnUI } = userSlice.actions;