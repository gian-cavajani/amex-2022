import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  type: '',
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    saveId: (state, action) => {
      state.id = action.payload;
    },
    saveType: (state, action) => {
      state.id = action.payload;
    },
    logOut: (state, action) => {
      state.id = '';
      state.type = '';
    },
  },
});

export const { saveId, saveType, logOut } = authSlice.actions;
export default authSlice.reducer;
