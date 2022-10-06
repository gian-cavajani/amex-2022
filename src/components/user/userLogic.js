import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase-config';
import logOut from '../../utils/logout';
import { collection, updateDoc, doc } from 'firebase/firestore';
import { store } from '../../store/store';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { removeNote, updateStatus } from '../../features/notesSlice';

const deleteNote = async (id) => {
  const noteDoc = doc(db, 'notes', id);
  const newFields = {
    deleted: true,
  };

  await updateDoc(noteDoc, newFields);
  store.dispatch(removeNote(id));
};

//NOTE UPDATE | NO ANDA EL DISPATCH
const updateNote = async (id, state) => {
  const noteDoc = doc(db, 'notes', id);
  const newFields = {
    state: !state,
  };
  await updateDoc(noteDoc, newFields);
  store.dispatch(updateStatus(id));
};

export default { deleteNote, updateNote };
