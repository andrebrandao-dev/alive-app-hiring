import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setQuote } from './quoteSlice';

interface AppState {
  menuActived: boolean;
}

const initialState: AppState = {
  menuActived: false,
};

export const AppSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    toggleMenuStatus: (state, action: PayloadAction<boolean>) => {
      state.menuActived = action.payload;
      console.log(setQuote)
    },
  },
});

export const { toggleMenuStatus } = AppSlice.actions;

export default AppSlice.reducer;