import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './Header'
import About from './About'
import Playlists from './Playlists'
import Footer from './Footer'

function Main() {
  return (
    <div>
        <Header />
        <Routes>
          <Route path="about" element={<About />} />
          <Route path="playlists" element={<Playlists />} />
        </Routes>
        <Footer />
    </div>
  )
}

export default Main