import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { signOut } from 'firebase/auth';
import { store } from '../store/store';

import { removeAllNotes } from '../features/notesSlice';

// const navigate = useNavigate();

const logOut = async () => {
  await signOut(auth);
  localStorage.clear();
  store.dispatch(removeAllNotes());
  //   navigate('/');
};

export default logOut;
