import React from 'react'
import SongCard from './SongCard'
import Filters from './Filters'
import SpeedDial from './SpeedDial'
import { Button, Card, Grid } from '@mui/material'

function SongsList({ songsAry, onClickDelete }) {

  function handleClickAddSong (event) {
    console.log('add song');
  }

  const songs = songsAry.map(song => {
    return (
      <Grid item xs={4}>
        <SongCard key={song.id} song={song} onClickDelete={onClickDelete} />
      </Grid>
    )
  })

  const addSongBtn = (
    <Grid item xs={4}>
      <Card sx={{
        display: "flex",
        height: 120,
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Button
          fullWidth
          onClick={handleClickAddSong}
          sx={{height: '100%'}}
          >➕ add song
        </Button>
      </Card>
    </Grid>
  )

  return (
    <Grid container spacing={2}>
      {songs}
      {songs.length > 0 ? addSongBtn : null}
    </Grid>
  )
}

export default SongsList