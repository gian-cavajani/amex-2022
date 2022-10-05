import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';

import { useDispatch } from 'react-redux';

import { saveAllNotes } from '../features/notesSlice';

import Loading from './Loading';
import Admin from './Admin';
import User from './User';

import functions from '../utils/funs';

const Home = () => {
  const [user, setUser] = useState('');
  const [load, setLoad] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notesCollectionRef = collection(db, 'notes');

  useEffect(() => {
    const storage = functions.getStorage();
    if (!storage.user) {
      navigate('/');
    }
    setUser(storage);
    console.log(storage);

    const getAllNotes = async () => {
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

      dispatch(saveAllNotes(filteredData));
      setLoad(false);
    };
    getAllNotes();
  }, []);

  if (load) {
    return <Loading />;
  }
  if (user.type === 'admin') {
    return <Admin user={user} />;
  }
  if (user.type === 'user') {
    return <User user={user} />;
  }
};

export default Home;
