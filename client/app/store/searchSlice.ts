import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Symbol = {
  symbol: string;
  name: string;
  type: string;
  region: string;
  marketOpen: string;
  marketClose: string;
  timezone: string;
  currency: string;
  matchScore: string;
}

interface SearchState {
  selectedSearch: Symbol | null;
}

const initialState: SearchState = {
  selectedSearch: null,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSelectedSearch: (state, action: PayloadAction<Symbol | null>) => {
      state.selectedSearch = action.payload;
    },
  },
});

export const { setSelectedSearch } = searchSlice.actions;

export default searchSlice.reducer;