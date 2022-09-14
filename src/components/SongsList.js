import React from 'react'
import SongCard from './SongCard'
import Filters from './Filters'
import SpeedDial from './SpeedDial'
import { Grid } from '@mui/material'

function SongsList({ songsAry, onClickDelete }) {

  const songs = songsAry.map(song => {
    return (
      <Grid item xs={4}>
        <SongCard key={song.id} song={song} onClickDelete={onClickDelete} />
      </Grid>
    )
  })

  return (
    <Grid container spacing={2}>
      {songs}
    </Grid>
  )
}

export default SongsList