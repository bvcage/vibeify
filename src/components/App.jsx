import '../App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from './HomePage';
import LoadingPage from './LoadingPage';
import MainPage from './MainPage';

function App() {

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="main/*" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
