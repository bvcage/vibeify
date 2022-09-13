import '../App.css';
import React from 'react';
import { Navigate, Routes, Route } from "react-router-dom";
import Home from './Home';
import Main from './Main';

function App() {

  return (
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="home/*" element={<Home />} />
        <Route path="main/*" element={<Main />} />
      </Routes>
  );
}

export default App;
