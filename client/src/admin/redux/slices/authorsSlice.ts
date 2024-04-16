import http from "@/api/api";
import { AuthorType } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthorsSliceState {
  authors: AuthorType[] | null,
  selected: AuthorType | null,
  isLoading: boolean,
  error: unknown,
}

const initialState: AuthorsSliceState = {
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
)

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    setSelectedBook: (state, action) => {
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
  }
});

export default authorsSlice.reducer;
export const { setSelectedBook } = authorsSlice.actions;