import { configureStore } from '@reduxjs/toolkit';
import ThemeSlice from './slices/ThemeSlice';

const store = configureStore({
  reducer: {
    theme: ThemeSlice,
  },
})

export default store;
export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;