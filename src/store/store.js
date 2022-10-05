import { configureStore } from '@reduxjs/toolkit';
import notesReducer from '../features/notesSlice';
import authReducer from '../features/authSlice';

export const store = configureStore({
  reducer: { notes: notesReducer, auth: authReducer },
});
