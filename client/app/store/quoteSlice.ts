import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Quote = {
  symbol: string;
  open: string;
  high: string;
  low: string;
  price: string;
  volume: string;
  latestTradingDay: string;
  previousClose: string;
  change: string;
  changePercent: string;
}

interface QuoteState {
  quote: Quote | null;
  quoteCompare: Quote | null;
}

const initialState: QuoteState = {
  quote: null,
  quoteCompare: null,
};

export const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    setQuote: (state, action: PayloadAction<Quote | null>) => {
      state.quote = action.payload;
    },

    setQuoteCompare: (state, action: PayloadAction<Quote | null>) => {
      state.quoteCompare = action.payload;
    }
  },
});

export const { setQuote, setQuoteCompare } = quoteSlice.actions;

export default quoteSlice.reducer;