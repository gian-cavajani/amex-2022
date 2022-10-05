import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store/store';

//COMPONENTS
import Register from './components/Register';
import Login from './components/Login';
import Notification from './components/Notification';
import Notes from './components/Notes';
import ErrorPage from './components/ErrorPage';
import NewNote from './components/NewNote';
import Admin from './components/Admin';

function App() {
  const [message, setMessage] = useState({ code: null, message: null });
  const sendMessage = (code, message) => {
    if (code === 'ok') {
      setMessage({ code, message });
    } else {
      setMessage({ code, message });
    }
    setTimeout(() => {
      setMessage({ code: null, message: null });
    }, 3000);
  };

  return (
    <div className="App">
      <Provider store={store}>
        <Notification message={message} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login sendMessage={sendMessage} />} />
            <Route
              path="/register"
              element={<Register sendMessage={sendMessage} />}
            />
            <Route
              path="/notes"
              element={<Notes sendMessage={sendMessage} />}
            />
            <Route
              path="/newNote"
              element={<NewNote sendMessage={sendMessage} />}
            />
            <Route path="/admin-page" element={<Admin />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
