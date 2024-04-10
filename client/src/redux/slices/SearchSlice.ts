import http from "@/api/api";
import { GenreType } from "@/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface SearchState {
  searchKeyword: string,
  searchFilter: string,
  genres: GenreType[]
}

const initialState: SearchState = {
  searchKeyword: "",
  searchFilter: "all",
  genres: []
}

export const getGenres = createAsyncThunk(
  "search/getGenres",
  async () => {
    const response = await http.get('/genres');
    return response.data
  }
)

const SearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchKeyword: ((state, action: PayloadAction<string>) => {
      state.searchKeyword = action.payload;
    }),
    setSearchFilter: ((state, action: PayloadAction<string>) => {
      state.searchFilter = action.payload;
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
    })
  }
});

export default SearchSlice.reducer;
export const { setSearchFilter, setSearchKeyword } = SearchSlice.actions;