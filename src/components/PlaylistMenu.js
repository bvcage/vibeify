import React, { useState } from 'react'
import GetSimilarForm from './GetSimilarForm'
import PlaylistCard from './PlaylistCard'

function PlaylistMenu() {

  const [playlistAry, setPlaylistAry] = useState(loadPlaylistsFromDB);

  function loadPlaylistsFromDB() {
    fetch(`http://localhost:3001/playlists`)
      .then(r => r.json())
      .then(playlists => {
        let tempAry = [];
        playlists.forEach(list => tempAry.push(list))
        setPlaylistAry([...tempAry]);
      })
  }

  return (
    <div>
      <h2>PlaylistMenu</h2>
    </div>
  )
}

export default PlaylistMenu