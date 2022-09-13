import React, { useEffect, useState } from 'react'
import '../App.css'
import PlaylistMenu from './PlaylistMenu'
import SongsList from './SongsList'
import { createDefaultPlaylists } from '../scripts/createPlaylists';

function Playlists() {

  // const [fullSongIdAry, setFullSongIdAry] = useState(loadSongsFromDB);
  // const [selectedPlaylist, setSelectedPlaylist] = useState('');
  // const [songsToDisplay, setSongsToDisplay] = useState([]);
  const [playlistAry, setPlaylistAry] = useState([]);

  useEffect(() => {
    createDefaultPlaylists().then(data => setPlaylistAry(data))
  }, []);

  console.log(playlistAry);

  // function loadSongsFromDB() {
  //   fetch(`http://localhost:3001/songs`)
  //     .then(r => r.json())
  //     .then(library => {
  //       let tempAry = [];
  //       library.forEach(song => tempAry.push(song))
  //       setFullSongIdAry(tempAry);
  //       setSongsToDisplay(tempAry);
  //     })
  // }

  // console.log(fullSongIdAry);

  return (
    <div>
      <PlaylistMenu playlistAry={playlistAry} />
      <SongsList />
    </div>
  )
}

export default Playlists