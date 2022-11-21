import { configureStore } from '@reduxjs/toolkit';
import { emailApi } from 'store/email/emailApi';
import { rootReducer } from 'store/reducers';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emailApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
