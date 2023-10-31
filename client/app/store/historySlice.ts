import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type History = {
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

interface HistoryState {
  history: History[] | [];
}

const initialState: HistoryState = {
  history: [],
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setHistory: (state, action: PayloadAction<History[] | []>) => {
      state.history = action.payload;
    },
  },
});

export const { setHistory } = historySlice.actions;

export default historySlice.reducer;