import React from 'react'
import { Card } from '@mui/material'

function SongCard({ song }) {
  const { name, album, artists } = song;
  return (
    <Card sx={{ maxWidth: 345 }}>
      {name}
      <br />
      {album.name}
      <br />
      {artists.map(artist => artist.name).join(", ")}
    </Card>
  )
}

export default SongCard