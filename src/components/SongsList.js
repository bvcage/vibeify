import { React }from 'react'
import SongCard from './SongCard'
import { Button, Card, Grid } from '@mui/material'
import { savePlaylistToSpotify } from '../scripts/spotifyLibrary'

function SongsList({ songsAry, showSongs, onClickDelete }) {

  function handleClickSave () {
    savePlaylistToSpotify(songsAry);
  }

  const songs = songsAry.map(song => {
    return (
      <Grid item xs={4} key={song.id} >
        <SongCard key={song.id} song={song} onClickDelete={onClickDelete} />
      </Grid>
    )
  });

  const saveBtn = (
    <Grid item xs={4} key='save-btn' >
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
          onClick={handleClickSave}
          sx={{height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)'}}
          >save to spotify
        </Button>
      </Card>
    </Grid>
  )

  return (
    <Grid container spacing={2}>
      { showSongs ? songs : null }
      { showSongs ? saveBtn : null }
    </Grid>
  )
}

export default SongsList