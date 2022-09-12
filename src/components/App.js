import '../App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Main from './Main';
import LoadLibrary from './LoadLibrary';

function App() {

  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="loading" element={<LoadLibrary />} />
        <Route path='main' element={<Main />} />
      </Routes>
  );
}

export default App;
