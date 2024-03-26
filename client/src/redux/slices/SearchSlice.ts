import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SearchState {
  searchKeyword: string,
  searchFilter: string
}

const initialState: SearchState = {
  searchKeyword: "Dostoyevsky",
  searchFilter: "all"
}

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
  }
});

export default SearchSlice.reducer;
export const { setSearchFilter, setSearchKeyword } = SearchSlice.actions;