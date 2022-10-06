import { useEffect, useRef } from 'react';
import { db } from '../../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import functions from '../../utils/funs';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../../features/notesSlice';
import { store } from '../../store/store';

const newNote = async (title, desc, type) => {
  const notesCollectionRef = collection(db, 'notes');

  const { id } = functions.getStorage();
  if (title === '' || desc === '') {
    throw 'Inputs shouldnt be empty';
  } else {
    const newDoc = {
      title,
      date: new Date(),
      status: false,
      description: desc,
      userId: id,
      type,
      deleted: false,
    };
    await addDoc(notesCollectionRef, newDoc);
    store.dispatch(addNote(newDoc));
  }
};

export default newNote;
