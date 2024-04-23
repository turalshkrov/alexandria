import { BookType, ListType } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getListsByUser } from "@/api/list";
import http from "@/api/api";

interface HomePageData {
  isLoading: boolean,
  error: unknown,
  data: {
    classics: BookType[] | null,
    science: BookType[] | null,
    philosophy: BookType[] | null,
    lists: ListType[] | null,
  }
}

const initialState: HomePageData = {
  isLoading: false,
  error: null,
  data: {
    classics: null,
    science: null,
    philosophy: null,
    lists: null
  }
}

export const getData = createAsyncThunk(
  'home/getData',
  async () => {
    const classics = (await http.get('/recommends/Classics')).data;
    const philosophy = (await http.get('/recommends/Philosophy')).data;
    const science = (await http.get('/recommends/Science')).data;
    const lists = await getListsByUser('65ff29e96e04a07705eac4d0');
    const data = { philosophy, classics, science, lists };
    return data;
  }
)

const HomePageSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, state => {
        state.isLoading = true;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
  }
});

export default HomePageSlice.reducer;