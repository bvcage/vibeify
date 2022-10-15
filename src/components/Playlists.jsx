import React, { useEffect, useState } from 'react'
import '../App.css'
import PlaylistsMenu from './PlaylistsMenu'
import SongsList from './SongsList'
import { addSongToPlaylist, removeSongFromPlaylist } from '../scripts/localDB';
import { Box, Stack } from '@mui/material';
import SearchBar from './SearchBar';
import PlaylistMergeForm from './PlaylistMergeForm';

function Playlists () {

  const [playlistAry, setPlaylistAry] = useState([])
  const [selectedPlaylist, setSelectedPlaylist] = useState();
  const [showSongs, setShowSongs] = useState(false);
  const [songsAry, setSongsAry] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/playlists')
    .then(r=>r.json())
    .then(data => setPlaylistAry(data))
  }, [])

  function onClickDelete (songId) {
    const patchSongsAry = removeSongFromPlaylist(selectedPlaylist, songId);
    const patchPlaylist = {...selectedPlaylist,
      "tracks": patchSongsAry
    }
    setPlaylistAry(patchPlaylist);
    setSelectedPlaylist(patchPlaylist);
    setSongsAry(patchSongsAry);
  }

  function onClickMerge (playlist) {
    setSongsAry(playlist.tracks);
    setSelectedPlaylist(playlist);
    setShowSongs(true);
  }

  function onClickPlaylist (playlist) {
    if (playlist !== selectedPlaylist) {
      setShowSongs(true);
      setSelectedPlaylist(playlist);
      setSongsAry(playlist.tracks);
    } else {
      setShowSongs(!showSongs);
    }
  }

  function onClickAdd (song) {
    const newSongsAry = addSongToPlaylist(selectedPlaylist, song);
    const newSongPlaylist = {...selectedPlaylist,
      "tracks": newSongsAry
    }
    setPlaylistAry(newSongPlaylist);
    setSelectedPlaylist(newSongPlaylist);
    setSongsAry(newSongsAry);
  };

  return (
    <Stack spacing={2}>
      <Box>
        <PlaylistsMenu playlistAry={playlistAry} onClickPlaylist={onClickPlaylist} />
        <SearchBar onClickAdd={onClickAdd} />
      </Box>
      <Box sx={{pb: 28}}>
        {selectedPlaylist && selectedPlaylist.id === "merge" ? <PlaylistMergeForm onSubmit={onClickMerge} /> : <SongsList songsAry={songsAry} showSongs={showSongs} onClickDelete={onClickDelete} />}
      </Box>
    </Stack>
  )
}

export default Playlists