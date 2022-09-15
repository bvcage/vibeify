import React, { useState } from 'react'
import GetSimilarForm from './GetSimilarForm'
import PlaylistCard from './PlaylistCard'
import { Container, Grid, Card } from '@mui/material'
import SearchBar from './SearchBar'

function PlaylistMenu({ playlistAry, onClickPlaylist }) {

  const playlists = playlistAry.map(playlist => {
    return (
      <Grid item xs={2} key={playlist.id} >
        <PlaylistCard key={playlist.id} playlist={playlist} onClickPlaylist={onClickPlaylist} />
      </Grid>
    )
  })

  return (
    <Grid container spacing={2} sx={{
      justifyContent: 'center', 
      height: 120, 
      paddingLeft: 2,
      }}>
        {playlists}
    </Grid>
  )
}

export default PlaylistMenu