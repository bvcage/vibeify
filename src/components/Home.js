import React from 'react'
import { Routes, Route } from 'react-router-dom'

import LoadLibrary from './LoadLibrary'
import Login from './Login'
import LoginButton from './LoginButton'

function Home() {
  return (
    <div className='container'>
      <header className="App-header">
        <h1>Vibeify.</h1>
        <br></br>
        <h4>Create playlists based on your mood.</h4>
        <br></br>
        <Routes>
          <Route path="/" element={<LoginButton />} />
          <Route path="login" element={<Login />} />
          <Route path="loading" element={<LoadLibrary />} />
        </Routes>
      </header>
    </div>
  )
}

export default Home