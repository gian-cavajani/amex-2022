import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logOut from '../../utils/logout';

const Admin = ({ user }) => {
  const navigate = useNavigate();

  let notes = useSelector((state) => state.notes.notes);

  const handleSignOut = () => {
    logOut();
    navigate('/');
  };

  return (
    <section>
      <p>
        user logged in: <strong>{user.user}</strong>
        <button onClick={handleSignOut}>Log Out</button>
      </p>
      <h2>Notes deleted:</h2>
      <ul>
        {notes.map((n) => (
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
