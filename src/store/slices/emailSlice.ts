import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postLetter } from 'api/email';
import { IFormValues } from 'types';

export const sendLetter = createAsyncThunk(
  'email/sendLetter',
  async (payload: IFormValues, { rejectWithValue }) => {
    try {
      const response = await postLetter(payload);

      if (!response.data.ok) {
        throw new Error();
      }

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
  reducers: {
    setEmailStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
  },
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

export const { setEmailStatus } = emailSlice.actions;

export default emailSlice.reducer;
