import { configureStore } from '@reduxjs/toolkit';
import conatctReducer from '@store/slices/contact.slice';

const store = configureStore({
  reducer: {
    contact: conatctReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
