import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type GainLoss = {
  current: string;
  consulting: string;
  gain: boolean;
}

interface GainLossState {
  gainLoss: GainLoss | null;
}

const initialState: GainLossState = {
  gainLoss: null,
};

export const gainLossSlice = createSlice({
  name: 'gainLoss',
  initialState,
  reducers: {
    setGainLoss: (state, action: PayloadAction<GainLoss | null>) => {
      state.gainLoss = action.payload;
    },
  },
});

export const { setGainLoss } = gainLossSlice.actions;

export default gainLossSlice.reducer;