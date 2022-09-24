import React, { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom"
import '../App.css'
import Header from './Header'
import About from './About'
import Footer from './Footer'
import Playlists from './Playlists'
import { clearPlaylists, createDefaultPlaylists } from '../scripts/createPlaylists';


import { Container } from '@mui/material'

function Main() {

  const [playlistAry, setPlaylistAry] = useState([]);

  useEffect(() => {
    clearPlaylists()
    .then(createDefaultPlaylists)
    .then(data => setPlaylistAry(data));
  }, []);

  function updatePlaylistAry (patchPlaylist) {
    setPlaylistAry(playlistAry.map(list => {
      if (list.id === patchPlaylist.id) return patchPlaylist;
      return list;
    }))
  }

  return (
    <div>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="about" element={<About />} />
          <Route path="playlists"
            element={
              <Playlists
                playlistAry={playlistAry}
                updatePlaylistAry={updatePlaylistAry}
              />
            }
          />
        </Routes>
      </Container>
      <Footer />
    </div>
  )
}

export default Main