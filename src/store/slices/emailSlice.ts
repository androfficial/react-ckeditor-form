import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postLetter } from 'api/email';
import { IFormValues } from 'types';

export const sendLetter = createAsyncThunk(
  'email/sendLetter',
  async (payload: IFormValues, { rejectWithValue }) => {
    try {
      const response = await postLetter(payload);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

const initialState = {
  status: 'idle',
};

export const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {},
  extraReducers: {
    [sendLetter.pending.type]: (state) => {
      state.status = 'loading';
    },
    [sendLetter.fulfilled.type]: (state) => {
      state.status = 'success';
    },
    [sendLetter.rejected.type]: (state) => {
      state.status = 'error';
    },
  },
});

export default emailSlice.reducer;
