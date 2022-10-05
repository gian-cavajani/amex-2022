import { useEffect, useRef } from 'react';
import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import functions from '../utils/funs';
import { useNavigate } from 'react-router-dom';
import EndCard from './EndCard';

const Register = ({ sendMessage }) => {
  let navigate = useNavigate();
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

  const user = useRef(null);
  const pass = useRef(null);
  const pass2 = useRef(null);

  const handleRegister = async (ev) => {
    ev.preventDefault();
    const username = user.current.value;
    const password = pass.current.value;
    const password2 = pass2.current.value;

    const [isPassOk, passMessage] = functions.validatePass(password, password2);
    const [isEmailOk, emailMessage] = functions.validateEmail(username);

    if (!isPassOk) {
      sendMessage('error', passMessage);
    } else if (!isEmailOk) {
      sendMessage('error', emailMessage);
    } else {
      try {
        const userInfo = await createUserWithEmailAndPassword(
          auth,
          username,
          password
        );
        functions.setStorage(username, 'user', userInfo.user.uid);
        sendMessage('ok', 'successful register');
        navigate('/home');
      } catch (error) {
        sendMessage('error', error.message);
      }
    }
  };

  return (
    <section>
      <h2>Sign up: </h2>
      <form onSubmit={handleRegister}>
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
            placeholder="Enter a new password"
            ref={pass}
            type="password"
            required
          />
        </label>
        <label>
          Repeat Password:
          <input
            placeholder="Enter again your new password"
            ref={pass2}
            type="password"
            required
          />
        </label>
        <input type="submit" value="Sign up" />
      </form>
      <EndCard title="Do you already have an account?" link="/" text="Login!" />
    </section>
  );
};

export default Register;
