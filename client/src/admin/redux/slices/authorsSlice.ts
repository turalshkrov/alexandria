/* eslint-disable no-unsafe-optional-chaining */
import http from "@/api/api";
import { AuthorData, AuthorType } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface BooksSliceState {
  authors: AuthorType[] | null,
  selected: AuthorType | null,
  isLoading: boolean,
  error: unknown,
}

const initialState: BooksSliceState = {
  authors: null,
  selected: null,
  isLoading: false,
  error: null,
}

export const getAuthors = createAsyncThunk(
  'authors/get',
  async () => {
    const response = await http.get('/authors/all');
    return response.data;
  }
);

export const createAuthor = createAsyncThunk(
  'authors/create',
  async (data: AuthorData) => {
    const response = await http.post('/authors/create', data)
    .then(response => response)
    .catch(error => {
      throw new Error(error.response.data.message);
    })
    return response.data;
  }
);

export const updateAuthor = createAsyncThunk(
  'authors/update',
  async ({id, data}: { id: string, data: AuthorData }) => {
    const response = await http.patch(`/authors/${id}`, data)
    .then(response => response)
    .catch(error => {
      throw new Error(error.response.data.message);
    })
    return response.data;
  }
);

export const deleteAuthor = createAsyncThunk(
  'authors/delete',
  async (id: string) => {
    const response = await http.delete(`/authors/${id}`)
    .then(response => response)
    .catch(error => {
      throw new Error(error.response.data.message);
    })
    return response.data;
  }
)

const authorsSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setSelectedAuthor: (state, action) => {
      state.selected = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuthors.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAuthors.fulfilled, (state, action) => {
        state.authors = action.payload;
        state.isLoading = false;
      })
      .addCase(getAuthors.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      })
      .addCase(createAuthor.fulfilled, (state, action) => {
        state.authors?.push(action.payload.author);
      })
      .addCase(updateAuthor.fulfilled, (state, action) => {
        if (state.authors) {
          state.authors = [ ...state.authors?.filter(author => author._id !== action.payload.author._id), action.payload.author ];
        }
      })
      .addCase(deleteAuthor.fulfilled, (state, action) => {
        if (state.authors) {
          state.authors = [ ...state.authors?.filter(author => author._id !== action.payload.author._id) ];
        }
      })
  }
});

export default authorsSlice.reducer;
export const { setSelectedAuthor } = authorsSlice.actions;