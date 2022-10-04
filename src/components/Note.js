import React from 'react';

const Note = ({ note, deleteNoteWithId, updateNoteState }) => {
  return (
    <section key={note.id} className="note">
      <h3>title: {note.title}</h3>
      <p>description: {note.description}</p>
      <p>type: {note.type}</p>
      <p>date created: {note.date.toDate().toDateString()}</p>
      <p>
        {note.state ? (
          <span className="ok">completed</span>
        ) : (
          <span className="error">incompleted</span>
        )}
      </p>
      <button onClick={deleteNoteWithId}>remove</button>
      {!note.state ? (
        <button onClick={updateNoteState}>complete</button>
      ) : (
        <span></span>
      )}
    </section>
  );
};

export default Note;
