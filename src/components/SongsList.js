import React from 'react'
import SongCard from './SongCard'
import Filters from './Filters'
import SpeedDial from './SpeedDial'
import { Container } from '@mui/material'

function SongsList({ songsAry }) {

  const songs = songsAry.map(song => {
    return (
      <SongCard key={song} song={song} />
    )
  })

  return (
    <Container maxWidth="md">
      {songs}
    </Container>
  )
}

export default SongsList