import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store/store';

//COMPONENTS
import Register from './components/register/Register';
import Login from './components/login/Login';
import Notification from './components/UI/Notification';
import ErrorPage from './components/endpoints/ErrorPage';
import NewNote from './components/newnote/NewNote';
import Home from './components/home/Home';

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
              path="/newNote"
              element={<NewNote sendMessage={sendMessage} />}
            />
            <Route path="/home" element={<Home sendMessage={sendMessage} />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
