import React from 'react'
import Card from '@mui/material/Card'

function PlaylistCard({ playlist, onClickPlaylist }) {

  function handleClick () {
    onClickPlaylist(playlist);
  }

  return (
    <Card onClick={handleClick} raised={true} sx={{
      display: 'flex', 
      backgroundColor: 'rgba(0, 0, 0, 0.6)', 
      height: 100,
      }}>
      {playlist.id}
    </Card>
  )
}

export default PlaylistCard