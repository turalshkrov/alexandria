import { configureStore } from '@reduxjs/toolkit';
import ThemeSlice from './slices/ThemeSlice';
import SearchSlice from './slices/SearchSlice';

const store = configureStore({
  reducer: {
    ThemeSlice,
    SearchSlice,
  },
})

export default store;
export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;