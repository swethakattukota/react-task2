import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
//import Register from './Register';
//import Task from './Task';
import Preferences from './Preferences';
import './style.css';
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/Register" element={<Register />}></Route> */}
          <Route path="/Preferences" element={<Preferences />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
