import { combineReducers } from '@reduxjs/toolkit';
import { emailApi } from 'store/email/emailApi';

export const rootReducer = combineReducers({
  [emailApi.reducerPath]: emailApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
