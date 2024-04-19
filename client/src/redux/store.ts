import { configureStore } from '@reduxjs/toolkit';
import ThemeSlice from './slices/ThemeSlice';
import SearchSlice from './slices/SearchSlice';
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';
import ModalSlice from './slices/ModalSlice';
import userListsSlice from './slices/userListsSlice';
import usersSlice from '@/admin/redux/slices/usersSlice';
import booksSlice from '@/admin/redux/slices/booksSlice';
import statsSlice from '@/admin/redux/slices/statsSlice';
import authorsSlice from '@/admin/redux/slices/authorsSlice';
import seriesSlice from '@/admin/redux/slices/seriesSlice';

const store = configureStore({
  reducer: {
    ThemeSlice,
    SearchSlice,
    authSlice,
    userSlice,
    ModalSlice,
    userListsSlice,
    statsSlice,
    usersSlice,
    booksSlice,
    authorsSlice,
    seriesSlice,
  },
})

export default store;
export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;