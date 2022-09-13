import React from 'react'
import "../App.css"
import logo from '../logo300.ico'

function Logo() {
  return (
    <div style={{ display: 'flex', gap: '8px', }}>
        <img src={logo} style={{ maxWidth: '40px', width: '100%', paddingLeft: '15px', maxHeight: '40px', paddingTop: '15px' }}/>
        <div>
            <h2 className='title'>Vibeify.</h2>
        </div>
    </div>
  )
}

export default Logo