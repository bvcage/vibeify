import React, { useEffect, useState } from 'react'
import '../App.css'
import PlaylistMenu from './PlaylistMenu'
import SongsList from './SongsList'
import { clearPlaylists, createDefaultPlaylists } from '../scripts/createPlaylists';

import { Box, Stack } from '@mui/material';

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
    <Stack spacing={2}>
      <Box>
        <PlaylistMenu playlistAry={playlistAry} onClickPlaylist={onClickPlaylist} />
      </Box>
      <Box>
        <SongsList songsAry={songsAry}/>
      </Box>
    </Stack>
  )
}

export default Playlists