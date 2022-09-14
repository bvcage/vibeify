import React from 'react'
import { Routes, Route } from 'react-router-dom'

import LoadLibrary from './LoadLibrary'
import Login from './Login'
import LoginButton from './LoginButton'

import LOGO from '../images/logo300.png';

function Home() {
  return (
    <div className='container'>
      <header className="App-header">
        <h1><img src={LOGO} alt="vibeify logo" width="50" height="50" />ibeify.</h1>
        <br></br>
        <h4>your favorite songs, reorganized by vibe</h4>
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