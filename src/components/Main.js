import React from 'react'
import Header from './Header'
import About from './About'
import Playlists from './Playlists'
import Footer from './Footer'

function Main() {
  return (
    <div style={{ height: '100vh' }}>
        <Header />
        <About />
        <Footer />
    </div>
  )
}

export default Main