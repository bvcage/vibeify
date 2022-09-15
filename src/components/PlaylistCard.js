import React from 'react'
import Card from '@mui/material/Card'

function PlaylistCard({ playlist, onClickPlaylist }) {

  function handleClick () {
    onClickPlaylist(playlist);
  }

  return (
    <Card onClick={handleClick}>
      {playlist.id}
    </Card>
  )
}

export default PlaylistCard