import React, { useState } from 'react'
import GetSimilarForm from './GetSimilarForm'
import PlaylistCard from './PlaylistCard'
import { Container } from '@mui/material'
import SearchBar from './SearchBar'

function PlaylistMenu({ playlistAry, onClickPlaylist }) {

  const playlists = playlistAry.map(playlist => {
    return (
      <PlaylistCard key={playlist.id} playlist={playlist} onClickPlaylist={onClickPlaylist} />
    )
  })

  return (
    <Container maxWidth="md" >
      {playlists}
      <SearchBar />
    </Container>
  )
}

export default PlaylistMenu