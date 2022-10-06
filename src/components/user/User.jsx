import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import logOut from '../../utils/logout';
import CRUD from './userLogic';
import Note from './Note';

const User = ({ user, sendMessage }) => {
  const [showAll, setShowAll] = useState(true);
  const notes = useSelector((state) => state.notes.notes);

  const navigate = useNavigate();

  const handleSignOut = () => {
    logOut();
    navigate('/');
  };

  let notesToShow = notes;
  if (!showAll) {
    notesToShow = notes.filter((note) => note.state !== true);
  }

  return (
    <section>
      <p>
        user logged in: <strong>{user.user}</strong>
        <button onClick={handleSignOut}>Log Out</button>
      </p>

      {notes.length < 1 ? (
        <span>You don't have notes</span>
      ) : (
        <article>
          <h2>Your notes: </h2>
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? 'only incompleted' : 'all'}
          </button>
          <article className="notes">
            {notesToShow.map((n) => {
              return (
                <Note
                  note={n}
                  key={n.id}
                  updateNoteState={() => {
                    CRUD.updateNote(n.id, n.state);
                    sendMessage('ok', 'note completed');
                  }}
                  deleteNoteWithId={() => {
                    CRUD.deleteNote(n.id);
                    sendMessage('ok', 'note deleted');
                  }}
                />
              );
            })}
          </article>
        </article>
      )}
      <button
        onClick={() => {
          navigate('/newNote');
        }}>
        create new note
      </button>
    </section>
  );
};

export default User;
