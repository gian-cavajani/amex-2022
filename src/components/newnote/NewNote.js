import { useEffect, useState } from 'react';
import functions from '../../utils/funs';
import { useNavigate } from 'react-router-dom';
import EndCard from '../UI/EndCard';
import newNote from './newnotelogic';

const NewNote = ({ sendMessage }) => {
  const [input, setInput] = useState({ title: '', desc: '', type: '' });
  const { title, desc, type } = input;
  let navigate = useNavigate();
  useEffect(() => {
    const storage = functions.getStorage();
    if (!storage.user) {
      navigate('/');
    }
  }, []);

  const handleNewNote = () => {
    try {
      //PROBLEMA CON LOS THROWS
      newNote(title, desc, type);
      sendMessage('ok', 'note created');
    } catch (error) {
      sendMessage('error', error.message);
    }
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section>
      <h2>Create new note/reminder: </h2>
      <article>
        <label>
          Title:
          <input
            placeholder="Enter a title"
            value={title}
            onChange={handleChange}
            type="text"
            name="title"
          />
        </label>
        <label>
          Description:
          <textarea
            placeholder="Enter a description"
            value={desc}
            onChange={handleChange}
            name="desc"
          />
        </label>
        <label>
          Type:
          <select onChange={handleChange} defaultValue={type} name="type">
            <option value="tasks">tasks</option>
            <option value="chores">chores</option>
            <option value="work">work-related</option>
            <option value="leisure">leisure</option>
            <option value="others">others</option>
          </select>
        </label>
        <button onClick={handleNewNote}>create</button>
      </article>
      <EndCard title="Go to your " link="/home" text="Notes" />
    </section>
  );
};

export default NewNote;
