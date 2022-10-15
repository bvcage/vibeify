import React from 'react'
import LoginButton from './LoginButton'
import logo from '../images/logo300.png'

function HomePage () {
  return (
    <header className="App-header">
      <h1><img src={logo} alt="vibeify logo" width="50" height="50" />ibeify.</h1>
      <br />
      <h4>your favorite songs, reorganized by vibe</h4>
      <br />
      <LoginButton />
    </header>
  )
}

export default HomePage