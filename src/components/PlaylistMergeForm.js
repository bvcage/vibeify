import { useEffect, useState } from 'react';
import { loadSpotifyPlaylistsAry } from '../scripts/localDB'

function PlaylistMergeForm () {

   const [spotifyPlaylistsAry, setSpotifyPlaylistsAry] = useState([]);

   useEffect(() => {
      loadSpotifyPlaylistsAry()
      .then(data => setSpotifyPlaylistsAry(data));
   }, [])

   const playlistsList = spotifyPlaylistsAry.map(playlist => {
      return (
         <li>{playlist.name}</li>
      )
   });

   return (
      <ul>{playlistsList}</ul>
   )
}

export default PlaylistMergeForm;