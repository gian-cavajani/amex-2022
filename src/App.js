import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Notification from './components/Notification';
import Notes from './components/Notes';
import ErrorPage from './components/ErrorPage';
import NewNote from './components/NewNote';
import Admin from './components/Admin';

function App() {
  const [message, setMessage] = useState({ code: null, message: null });
  const sendMessage = (p1, p2) => {
    if (p1 === 'ok') {
      setMessage({ code: 'ok', message: p2 });
    } else {
      setMessage({ code: 'error', message: p2 });
    }
    setTimeout(() => {
      setMessage({ code: null, message: null });
    }, 3000);
  };

  useEffect(() => {}, []);

  return (
    <div className="App">
      <Notification message={message} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login sendMessage={sendMessage} />} />
          <Route
            path="/register"
            element={<Register sendMessage={sendMessage} />}
          />
          <Route path="/notes" element={<Notes sendMessage={sendMessage} />} />
          <Route
            path="/newNote"
            element={<NewNote sendMessage={sendMessage} />}
          />
          <Route
            path="/admin-page"
            element={<Admin sendMessage={sendMessage} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
