import { saveAllNotes } from '../../features/notesSlice';
import { collection, getDocs } from 'firebase/firestore';
import { store } from '../../store/store';
import { db } from '../../firebase-config';

const getAllNotes = async (storage) => {
  const notesCollectionRef = collection(db, 'notes');

  const data = await getDocs(notesCollectionRef);
  let filteredData;

  if (storage.type === 'admin') {
    filteredData = data.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .filter((note) => note.deleted);
  }

  if (storage.type === 'user') {
    filteredData = data.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .filter((note) => !note.deleted && storage.id === note.userId);
  }

  store.dispatch(saveAllNotes(filteredData));
};

export default getAllNotes;
