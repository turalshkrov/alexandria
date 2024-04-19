/* eslint-disable no-unsafe-optional-chaining */
import http from "@/api/api";
import { SeriesData, SeriesType } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface SeriesSliceState {
  series: SeriesType[] | null,
  selected: SeriesType | null,
  isLoading: boolean,
  error: unknown,
}

const initialState: SeriesSliceState = {
  series: null,
  selected: null,
  isLoading: false,
  error: null,
}

export const getSeries = createAsyncThunk(
  'series/get',
  async () => {
    const response = await http.get('/series/');
    return response.data;
  }
);

export const createSeries = createAsyncThunk(
  'series/create',
  async (data: SeriesData) => {
    const response = await http.post('/series/create', data)
    .then(response => response)
    .catch(error => {
      throw new Error(error.response.data.message);
    })
    return response.data;
  }
);

export const updateSeries = createAsyncThunk(
  'series/update',
  async ({id, data}: { id: string, data: SeriesData }) => {
    const response = await http.patch(`/series/${id}`, data)
    .then(response => response)
    .catch(error => {
      throw new Error(error.response.data.message);
    })
    return response.data;
  }
);

export const addBookToSeries = createAsyncThunk(
  'series/add-book',
  async ({ id, bookId }: { id: string, bookId: string }) => {
    const response = await http.patch(`/series/${id}/add-book`, { bookId })
    .then(response => response)
    .catch(error => {
      throw new Error(error.response.data.message);
    })
    return response.data;
  }
);

export const removeBookFromSeries = createAsyncThunk(
  'series/remove-book',
  async ({ id, bookId }: { id: string, bookId: string }) => {
    const response = await http.patch(`/series/${id}/remove-book`, { bookId })
    .then(response => response)
    .catch(error => {
      throw new Error(error.response.data.message);
    })
    return response.data;
  }
);

export const deleteSeries = createAsyncThunk(
  'series/delete',
  async (id: string) => {
    const response = await http.delete(`/series/${id}`)
    .then(response => response)
    .catch(error => {
      throw new Error(error.response.data.message);
    })
    return response.data;
  }
);

const seriesSlice = createSlice({
  name: 'series',
  initialState,
  reducers: {
    setSelectedSeries: (state, action) => {
      state.selected = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSeries.pending, state => {
        state.isLoading = true;
      })
      .addCase(getSeries.fulfilled, (state, action) => {
        state.series = action.payload;
        state.isLoading = false;
      })
      .addCase(getSeries.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      })
      .addCase(createSeries.fulfilled, (state, action) => {
        state.series?.push(action.payload.series);
      })
      .addCase(updateSeries.fulfilled, (state, action) => {
        if (state.series) {
          state.series = [ ...state.series?.filter(series => series._id !== action.payload.series._id), action.payload.series ];
        }
      })
      .addCase(deleteSeries.fulfilled, (state, action) => {
        if (state.series) {
          state.series = [ ...state.series?.filter(series => series._id !== action.payload.series._id) ];
        }
      })
  }
});

export default seriesSlice.reducer;
export const { setSelectedSeries } = seriesSlice.actions;