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
import Note from './Note';

const Notes = ({ sendMessage }) => {
  const [load, setLoad] = useState(true);
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [user, setUser] = useState(null);
  let navigate = useNavigate();

  const notesCollectionRef = collection(db, 'notes');

  useEffect(() => {
    const storage = functions.getStorage();
    setUser(storage);
    if (!storage.user) {
      navigate('/');
    } else {
      const getUsers = async () => {
        const data = await getDocs(notesCollectionRef);
        console.log(data.docs);
        setNotes(
          data.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .filter((note) => note.userId == storage.id)
        );
        setLoad(false);
      };
      getUsers();
    }
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    localStorage.clear();
    navigate('/');
  };

  //NOTE DELETE
  const deleteNote = async (id) => {
    const noteDoc = doc(db, 'notes', id);

    await deleteDoc(noteDoc);
    sendMessage('ok', 'note deleted');
    setNotes(notes.filter((note) => note.id !== id));
  };

  //NOTE UPDATE
  const updateNote = async (id, state) => {
    const noteDoc = doc(db, 'notes', id);
    const newFields = {
      state: !state,
    };
    await updateDoc(noteDoc, newFields);
    sendMessage('ok', 'note completed');
    setNotes(
      notes.map((note) => (note.id !== id ? note : { ...note, state: !state }))
    );
  };

  let notesToShow = notes;
  if (!showAll) {
    notesToShow = notes.filter((note) => note.state !== true);
  }
  if (load) {
    return <Loading />;
  }
  return (
    <div>
      <p>
        user logged in: <strong>{user.user}</strong>
        <button onClick={handleSignOut}>Log Out</button>
      </p>

      {notes.length < 1 ? (
        <div>You don't have notes</div>
      ) : (
        <div>
          <h2>Your notes: </h2>
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? 'only incompleted' : 'all'}
          </button>
          <div className="notes">
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
          </div>
        </div>
      )}
      <button
        onClick={() => {
          navigate('/newNote');
        }}>
        create new note
      </button>
    </div>
  );
};

export default Notes;
