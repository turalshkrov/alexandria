import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  theme: string,
}
const initialState: ThemeState = {
  theme: localStorage.getItem('theme') || 'dark',
}

export const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    }
  }
});

export default ThemeSlice.reducer;
export const { toggleTheme } = ThemeSlice.actions;