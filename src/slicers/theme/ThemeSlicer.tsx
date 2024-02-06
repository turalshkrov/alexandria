import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  theme: 'dark' | 'light'
}
const initialState: ThemeState = {
  theme: 'dark'
}

export const ThemeSlicer = createSlice({
  name: 'Theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    }
  }
})

export default ThemeSlicer.reducer;
export const { toggleTheme } = ThemeSlicer.actions;