import '../App.css'
import React from 'react'
import { Routes, Route } from "react-router-dom"
import HomePage from './HomePage'
import Layout from './Layout'
import LoadingPage from './LoadingPage'
import About from './About'
import Playlists from './Playlists'

function App() {

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route element={<Layout />}>
          <Route path="/about" element={<About />} />
          <Route path="/playlists" element={<Playlists />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
