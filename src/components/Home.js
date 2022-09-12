import React from 'react'
import LoginButton from './LoginButton'

function Home() {
  return (
    <div className='container'>
      <header className="App-header">
        <h1>Vibeify.</h1>
        <br></br>
        <h4>Create playlists based on your mood.</h4>
        <br></br>
        <LoginButton />
      </header>
    </div>
  )
}

export default Home