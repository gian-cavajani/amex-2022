import { useEffect, useRef } from 'react';
import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import functions from '../utils/funs';
import { useNavigate } from 'react-router-dom';
import EndCard from './EndCard';

const Register = ({ sendMessage }) => {
  useEffect(() => {
    const userId = functions.getStorage();
    if (userId.user) {
      if (userId.user === 'admin@gmail.com') {
        navigate('/admin-page');
      } else {
        navigate('/notes');
      }
    }
  }, []);

  let navigate = useNavigate();
  const user = useRef(null);
  const pass = useRef(null);
  const pass2 = useRef(null);

  const handleRegister = async () => {
    let username = user.current.value;
    let password = pass.current.value;
    let password2 = pass2.current.value;

    if (password !== password2) {
      sendMessage('error', 'Passwords must be equal');
    } else {
      try {
        const userInfo = await createUserWithEmailAndPassword(
          auth,
          username,
          password
        );
        functions.setStorage(username, password, userInfo.user.uid);
        sendMessage('ok', 'successful register');
        navigate('/notes');
      } catch (error) {
        sendMessage('error', error.message);
      }
    }
  };

  return (
    <section>
      <h2>Sign up: </h2>
      <article>
        <label>
          Email:
          <input placeholder="Enter your email" ref={user} type="text" />
        </label>
        <br />
        <label>
          Password:
          <input
            placeholder="Enter a new password"
            ref={pass}
            type="password"
          />
        </label>
        <br />
        <label>
          Repeat Password:
          <input
            placeholder="Enter again your new password"
            ref={pass2}
            type="password"
          />
        </label>
        <br />

        <br />
        <input type="button" value="Sign up" onClick={handleRegister} />
      </article>
      <EndCard title="Do you already have an account?" link="/" text="Login!" />
    </section>
  );
};

export default Register;
