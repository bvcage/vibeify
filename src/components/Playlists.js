import React, { useEffect, useState } from 'react'
import '../App.css'
import PlaylistMenu from './PlaylistMenu'
import SongsList from './SongsList'
import { clearPlaylists, createDefaultPlaylists } from '../scripts/createPlaylists';

function Playlists() {

  const [playlistAry, setPlaylistAry] = useState([]);
  const [songsAry, setSongsAry] = useState([]);

  useEffect(() => {
    clearPlaylists()
    .then(createDefaultPlaylists)
    .then(data => setPlaylistAry(data))
  }, []);

  function onClickPlaylist (playlist) {
    setSongsAry(playlist.tracks);
  }

  return (
    <div>
      <PlaylistMenu playlistAry={playlistAry} onClickPlaylist={onClickPlaylist} />
      <SongsList songsAry={songsAry}/>
    </div>
  )
}

export default Playlists