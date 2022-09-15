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
      <Grid item xs={4} key={song.id} >
        <SongCard key={song.id} song={song} onClickDelete={onClickDelete} />
      </Grid>
    )
  })

  const addSongBtn = (
    <Grid item xs={4} key='add-btn' >
      <Card raised={true} sx={{
        display: "flex",
        height: 120,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'rgba(255, 255, 255, 0)'
      }}>
        <Button
          variant='contained'
          fullWidth
          onClick={handleClickAddSong}
          sx={{height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)'}}
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