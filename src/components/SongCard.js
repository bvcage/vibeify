import React from 'react'
import { Card } from '@mui/material'

function SongCard({ song }) {
  return (
    <Card>
      {song.name}
    </Card>
  )
}

export default SongCard