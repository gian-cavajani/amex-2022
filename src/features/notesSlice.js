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
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    updateStatus: (state, action) => {
      const note = state.notes.find((note) => note.id === action.payload);
      console.log(note);
      note.state = false; //SOLUCIONAR ESTO
    },
    removeAllNotes: (state, action) => {
      state.notes = [];
    },
  },
});

export const {
  updateStatus,
  saveAllNotes,
  addNote,
  removeNote,
  removeAllNotes,
} = notesSlice.actions;
export default notesSlice.reducer;
