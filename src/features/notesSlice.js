import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notes: [],
};

export const notesSlice = createSlice({
  name: 'notesSlice',
  initialState,
  reducers: {
    saveAllNotes: (state, action) => {
      state.notes = action.payload;
    },
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },
    removeNote: (state, action) => {
      state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

export const { loadNotes, addNote } = notesSlice.actions;
export default notesSlice.reducer;
