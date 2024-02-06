import { configureStore } from '@reduxjs/toolkit';
import ThemeSlicer from './slicers/theme/ThemeSlicer';

const store = configureStore({
  reducer: {
    theme: ThemeSlicer,
  },
})

export default store;
export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;