import React, { useState } from 'react'
import '../App.css'
import PlaylistMenu from './PlaylistMenu'
import SongsList from './SongsList'
import { addSongToPlaylist, removeSongFromPlaylist } from '../scripts/localDB';

import { Box, Stack } from '@mui/material';
import SearchBar from './SearchBar';

function Playlists({ playlistAry, updatePlaylistAry }) {

  const [selectedPlaylist, setSelectedPlaylist] = useState();
  const [songsAry, setSongsAry] = useState([]);

  function onClickDelete (songId) {
    const patchSongsAry = removeSongFromPlaylist(selectedPlaylist, songId);
    const patchPlaylist = {...selectedPlaylist,
      "tracks": patchSongsAry
    }
    updatePlaylistAry(patchPlaylist);
    setSelectedPlaylist(patchPlaylist);
    setSongsAry(patchSongsAry);
  }

  function onClickPlaylist (playlist) {
    setSelectedPlaylist(playlist);
    setSongsAry(playlist.tracks);
  }

  function onClickAdd (song) {
    const newSongsAry = addSongToPlaylist(selectedPlaylist, song);
    const newSongPlaylist = {...selectedPlaylist,
      "tracks": newSongsAry
    }
    updatePlaylistAry(newSongPlaylist);
    setSelectedPlaylist(newSongPlaylist);
    setSongsAry(newSongsAry);
  };

  return (
    <Stack spacing={2}>
      <Box>
        <PlaylistMenu playlistAry={playlistAry} onClickPlaylist={onClickPlaylist} />
        <SearchBar onClickAdd={onClickAdd} />
      </Box>
      <Box sx={{pb: 28}}>
        <SongsList songsAry={songsAry} onClickDelete={onClickDelete} />
      </Box>
    </Stack>
  )
}

export default Playlists