import http from "@/api/api";
import { BookType } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface BooksSliceState {
  books: BookType[] | null,
  selected: BookType | null,
  isLoading: boolean,
  error: unknown,
}

const initialState: BooksSliceState = {
  books: null,
  selected: null,
  isLoading: false,
  error: null,
}

export const getBooks = createAsyncThunk(
  'books/get',
  async () => {
    const response = await http.get('/books/all');
    return response.data;
  }
)

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setSelectedBook: (state, action) => {
      state.selected = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, state => {
        state.isLoading = true;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.isLoading = false;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      })
  }
});

export default booksSlice.reducer;
export const { setSelectedBook } = booksSlice.actions;