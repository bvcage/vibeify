import React from 'react'
import LoginButton from './LoginButton'
import Nav from './Nav'
import Logo from './Logo'

function Header() {
  return (
    <div className='header'>
        <Logo />
        <Nav />
    </div>
  )
}

export default Header