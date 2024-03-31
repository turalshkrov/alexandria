import { configureStore } from '@reduxjs/toolkit';
import ThemeSlice from './slices/ThemeSlice';
import SearchSlice from './slices/SearchSlice';
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';
import ModalSlice from './slices/ModalSlice';

const store = configureStore({
  reducer: {
    ThemeSlice,
    SearchSlice,
    authSlice,
    userSlice,
    ModalSlice,
  },
})

export default store;
export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;