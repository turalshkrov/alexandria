import http from "@/api/api";
import { BookType, createBookData } from "@/types";
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
  async (data: createBookData) => {
    const response = await http.post('/books/create', data)
    .then(response => response)
    .catch(error => {
      throw new Error(error.response.data.message);
    })
    return response;
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
        state.books?.push(action.payload.data.book);
      })
  }
});

export default booksSlice.reducer;
export const { setSelectedBook } = booksSlice.actions;