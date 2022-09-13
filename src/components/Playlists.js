import React, { useState } from 'react'
import PlaylistMenu from './PlaylistMenu'
import SongsList from './SongsList'

function Playlists() {

  const [fullSongIdAry, setFullSongIdAry] = useState(loadSongsFromDB);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [songsToDisplay, setSongsToDisplay] = useState([]);

  function loadSongsFromDB() {
    fetch(`http://localhost:3001/songs`)
      .then(r => r.json())
      .then(library => {
        let tempAry = [];
        library.forEach(song => tempAry.push(song))
        setFullSongIdAry(tempAry);
      })
  }

  return (
    <div>
      <h2>Playlists</h2>
      <PlaylistMenu />
      <SongsList songs={songsToDisplay} />
    </div>
  )
}

export default Playlists