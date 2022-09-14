import React, { useEffect, useState } from 'react'
import '../App.css'
import PlaylistMenu from './PlaylistMenu'
import SongsList from './SongsList'
import { clearPlaylists, createDefaultPlaylists } from '../scripts/createPlaylists';
import { addSongToPlaylist, removeSongFromPlaylist } from '../scripts/localDB';

import { Box, Stack } from '@mui/material';
import SearchBar from './SearchBar';

function Playlists() {

  const [playlistAry, setPlaylistAry] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState();
  const [songsAry, setSongsAry] = useState([]);

  useEffect(() => {
    clearPlaylists()
    .then(createDefaultPlaylists)
    .then(data => setPlaylistAry(data))
  }, []);

  function onClickDelete (songId) {
    const patchSongsAry = removeSongFromPlaylist(selectedPlaylist, songId);
    const patchPlaylist = {...selectedPlaylist,
      "tracks": patchSongsAry
    }
    setPlaylistAry(playlistAry.map(list => {
      if (list.id === patchPlaylist.id) return patchPlaylist;
      return list;
    }))
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
    setPlaylistAry(playlistAry.map(list => {
      if (list.id === newSongPlaylist.id) return newSongPlaylist;
      return list;
    }))
    setSelectedPlaylist(newSongPlaylist)
    setSongsAry(newSongsAry)
  };

  return (
    <Stack spacing={2}>
      <Box>
        <PlaylistMenu playlistAry={playlistAry} onClickPlaylist={onClickPlaylist} />
        <SearchBar onClickAdd={onClickAdd} />
      </Box>
      <Box>
        <SongsList songsAry={songsAry} onClickDelete={onClickDelete} />
      </Box>
    </Stack>
  )
}

export default Playlists