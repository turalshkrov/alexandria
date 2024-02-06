import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  theme: 'dark' | 'light'
}
const initialState: ThemeState = {
  theme: 'dark'
}

export const ThemeSlice = createSlice({
  name: 'Theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    }
  }
})

export default ThemeSlice.reducer;
export const { toggleTheme } = ThemeSlice.actions;