import React from 'react'
import { Routes, Route } from "react-router-dom"
import '../App.css'
import Header from './Header'
import About from './About'
import Footer from './Footer'
import Playlists from './Playlists'

import { Container } from '@mui/material'

function Main() {
  return (
    <>
    <div className='container'>
        <Header />
        <Container maxWidth="md">
          <Routes>
            <Route path="about" element={<About />} />
            <Route path="playlists" element={<Playlists />} />
          </Routes>
        </Container>
        <Footer />
    </div>
    </>
  )
}

export default Main