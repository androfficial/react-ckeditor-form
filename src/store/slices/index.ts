import { combineReducers } from '@reduxjs/toolkit';

import email from './emailSlice';

export const rootReducer = combineReducers({
  email,
});

export type RootState = ReturnType<typeof rootReducer>;
