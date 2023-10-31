import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    },
  },
});

export const { toggleMenuStatus } = AppSlice.actions;

export default AppSlice.reducer;