import { useEffect, useRef, useState } from 'react';
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import functions from '../utils/funs';
import { useNavigate } from 'react-router-dom';
import EndCard from './EndCard';

const Login = ({ sendMessage }) => {
  let navigate = useNavigate();
  const user = useRef(null);
  const pass = useRef(null);

  useEffect(() => {
    const userId = functions.getStorage();
    if (userId.user) {
      navigate('/notes');
    }
  }, []);

  const handleLogin = async () => {
    let username = user.current.value;
    let password = pass.current.value;

    try {
      const userInfo = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      functions.setStorage(username, password, userInfo.user.uid);
      sendMessage('ok', 'successful login');
      navigate('/notes');
    } catch (error) {
      sendMessage('error', error.message);
    }
  };

  return (
    <section>
      <h2>Sign in: </h2>
      <article>
        <label>
          Email:
          <input placeholder="Enter your email" ref={user} type="text" />
        </label>
        <br />
        <label>
          Password:
          <input placeholder="Enter your password" ref={pass} type="password" />
        </label>

        <br />
        <input type="button" value="Login" onClick={handleLogin} />
      </article>
      <EndCard
        title="You dont have an account?"
        link="/register"
        text="Register!"
      />
    </section>
  );
};

export default Login;