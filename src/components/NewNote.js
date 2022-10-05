import { useEffect, useRef, useState } from 'react';
import { db } from '../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import functions from '../utils/funs';
import { useNavigate } from 'react-router-dom';
import EndCard from './EndCard';

const NewNote = ({ sendMessage }) => {
  let navigate = useNavigate();
  useEffect(() => {
    const storage = functions.getStorage();
    if (!storage.user) {
      navigate('/');
    }
  }, []);

  const notesCollectionRef = collection(db, 'notes');
  const title = useRef(null);
  const description = useRef(null);
  const selectRef = useRef(null);

  const handleNewNote = async () => {
    const { id } = functions.getStorage();
    const newTitle = title.current.value;
    const newDesc = description.current.value;
    const type = selectRef.current.value;

    if (newTitle === '' || newDesc === '') {
      sendMessage('error', 'Inputs shouldnt be empty ');
    } else {
      try {
        await addDoc(notesCollectionRef, {
          title: newTitle,
          date: new Date(),
          status: false,
          description: newDesc,
          userId: id,
          type,
          deleted: false,
        });
        sendMessage('ok', 'Note created');
      } catch (error) {
        sendMessage('error', error.message);
      }
    }
  };

  return (
    <section>
      <h2>Create new note/reminder: </h2>
      <article>
        <label>
          Title:
          <input placeholder="Enter a title" ref={title} type="text" />
        </label>
        <label>
          Description:
          <textarea
            placeholder="Enter a description"
            ref={description}
            type=""
          />
        </label>
        <label>
          Type:
          <select id="type" ref={selectRef}>
            <option value="tasks">tasks</option>
            <option value="chores">chores</option>
            <option value="work">work-related</option>
            <option value="leisure">leisure</option>
            <option value="others">others</option>
          </select>
        </label>
        <button onClick={handleNewNote}>create</button>
      </article>
      <EndCard title="Go to your " link="/notes" text="Notes" />
    </section>
  );
};

export default NewNote;
