import React from 'react'
import PlaylistMenu from './PlaylistMenu'
import SongsList from './SongsList'

function Playlists() {
  return (
    <div>
      <h2>Playlists</h2>
      <PlaylistMenu />
      <SongsList />
    </div>
  )
}

export default Playlists