import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase-config';
import { collection } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import getAllNotes from './homeLogic';
import Loading from '../UI/Loading';
import Admin from '../admin/Admin';
import User from '../user/User';
import functions from '../../utils/funs';

const Home = ({ sendMessage }) => {
  const [user, setUser] = useState('');
  const [load, setLoad] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const storage = functions.getStorage();
    if (!storage.user) {
      navigate('/');
    }
    setUser(storage);
    const get = async () => {
      await getAllNotes(storage);
      setLoad(false);
    };

    get();
  }, [load]);

  if (load) {
    return <Loading />;
  }
  if (user.type === 'admin') {
    return <Admin user={user} sendMessage={sendMessage} />;
  }
  if (user.type === 'user') {
    return <User user={user} sendMessage={sendMessage} />;
  }
};

export default Home;
