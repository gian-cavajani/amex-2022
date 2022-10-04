import React from 'react';
import { useEffect, useState } from 'react';
import functions from '../utils/funs';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase-config';
import { signOut } from 'firebase/auth';
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

const Admin = ({ sendMessage }) => {
  const [notes, setNotes] = useState([]);
  const [load, setLoad] = useState(true);
  const [showAll, setShowAll] = useState(true);
  let navigate = useNavigate();
  const notesCollectionRef = collection(db, 'notes');

  useEffect(() => {
    const userId = functions.getStorage();
    if (userId.user !== 'admin@gmail.com') {
      navigate('/notes');
    }
    const getAllNotes = async () => {
      const data = await getDocs(notesCollectionRef);
      setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoad(false);
    };
    getAllNotes();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    localStorage.clear();
    navigate('/');
  };

  let notesToShow = notes;
  if (!showAll) {
    notesToShow = notes.filter((note) => note.deleted);
  }
  if (load) {
    return <Loading />;
  }
  return (
    <section>
      <p>
        user logged in: <strong>Admin</strong>
        <button onClick={handleSignOut}>Log Out</button>
      </p>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'only deleted' : 'all'}
      </button>
      <ul>
        {notesToShow.map((n) => (
          <li key={n.id}>
            <p>title: {n.title}</p>
            status:{' '}
            {n.state ? (
              <span className="ok2">completed</span>
            ) : (
              <span className="error2">incompleted</span>
            )}
            <p>date created: {n.date.toDate().toDateString()}</p>
            <p>user id: {n.userId}</p>
            {n.deleted ? (
              <p className="error">deleted</p>
            ) : (
              <p className="ok">active</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Admin;
