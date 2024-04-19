/* eslint-disable no-unsafe-optional-chaining */
import http from "@/api/api";
import { BookType, CreateBookData } from "@/types";
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
);

export const createBook = createAsyncThunk(
  'books/create',
  async (data: CreateBookData) => {
    const response = await http.post('/books/create', data)
    .then(response => response)
    .catch(error => {
      throw new Error(error.response.data.message);
    })
    return response.data;
  }
);

export const updateBook = createAsyncThunk(
  'books/update',
  async ({id, data}: { id: string, data: CreateBookData }) => {
    const response = await http.patch(`/books/${id}`, data)
    .then(response => response)
    .catch(error => {
      throw new Error(error.response.data.message);
    })
    return response.data;
  }
);

export const deleteBook = createAsyncThunk(
  'books/delete',
  async (id: string) => {
    const response = await http.delete(`/books/${id}`)
    .then(response => response)
    .catch(error => {
      throw new Error(error.response.data.message);
    })
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
      .addCase(createBook.fulfilled, (state, action) => {
        state.books?.push(action.payload.book);
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        if (state.books) {
          state.books = [ ...state.books?.filter(book => book._id !== action.payload.book._id), action.payload.book ];
        }
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        if (state.books) {
          state.books = [ ...state.books?.filter(book => book._id !== action.payload.book._id) ];
        }
      })
  }
});

export default booksSlice.reducer;
export const { setSelectedBook } = booksSlice.actions;