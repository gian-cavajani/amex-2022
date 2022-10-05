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
      navigate('/home');
    }
  }, []);

  const handleLogin = async (ev) => {
    ev.preventDefault();

    let username = user.current.value;
    let password = pass.current.value;
    const [isPassOk, passMessage] = functions.validatePass(password);
    const [isEmailOk, emailMessage] = functions.validateEmail(username);

    if (!isPassOk) {
      sendMessage('error', passMessage);
    } else if (!isEmailOk) {
      sendMessage('error', emailMessage);
    } else {
      try {
        const userInfo = await signInWithEmailAndPassword(
          auth,
          username,
          password
        );
        if (username === 'admin@gmail.com') {
          functions.setStorage(username, 'admin', userInfo.user.uid);
        } else {
          functions.setStorage(username, 'user', userInfo.user.uid);
        }
        navigate('/home');
        sendMessage('ok', 'successful login');
      } catch (error) {
        sendMessage('error', error.message);
      }
    }
  };

  return (
    <section>
      <h2>Sign in: </h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            placeholder="Enter your email"
            ref={user}
            type="email"
            required
          />
        </label>
        <label>
          Password:
          <input
            id="loginPass"
            placeholder="Enter your password"
            ref={pass}
            type="password"
            required
          />
        </label>

        <input type="submit" value="Login" />
      </form>
      <EndCard
        title="You dont have an account?"
        link="/register"
        text="Register!"
      />
    </section>
  );
};

export default Login;
