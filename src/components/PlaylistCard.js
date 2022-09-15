import React from 'react'
import Card from '@mui/material/Card'

function PlaylistCard({ playlist, onClickPlaylist }) {

  function handleClick () {
    onClickPlaylist(playlist);
  }

  return (
    <Card onClick={handleClick} raised='true' sx={{
      display: 'flex', 
      backgroundColor: '#1e1e1e', 
      height: 100,
      }}>
      {playlist.id}
    </Card>
  )
}

export default PlaylistCard