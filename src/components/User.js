import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase-config';
import { signOut } from 'firebase/auth';
import { collection, updateDoc, doc } from 'firebase/firestore';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import {
  removeAllNotes,
  removeNote,
  updateStatus,
} from '../features/notesSlice';

import Note from './Note';

const User = ({ user, sendMessage }) => {
  const [showAll, setShowAll] = useState(true);
  const notesCollectionRef = collection(db, 'notes');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notes = useSelector((state) => state.notes.notes);

  const handleSignOut = async () => {
    await signOut(auth);
    localStorage.clear();
    dispatch(removeAllNotes());
    navigate('/');
  };

  //NOTE DELETE | ANDA BIEN
  const deleteNote = async (id) => {
    const noteDoc = doc(db, 'notes', id);
    const newFields = {
      deleted: true,
    };

    await updateDoc(noteDoc, newFields);
    // sendMessage('ok', 'note deleted');
    dispatch(removeNote(id));
  };

  //NOTE UPDATE | NO ANDA EL DISPATCH
  const updateNote = async (id, state) => {
    const noteDoc = doc(db, 'notes', id);
    const newFields = {
      state: !state,
    };
    await updateDoc(noteDoc, newFields);
    dispatch(updateStatus(id));
    // sendMessage('ok', 'note completed');
    // setNotes(
    //   notes.map((note) => (note.id !== id ? note : { ...note, state: !state }))
    // );
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
                    updateNote(n.id, n.state);
                  }}
                  deleteNoteWithId={() => {
                    deleteNote(n.id);
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
