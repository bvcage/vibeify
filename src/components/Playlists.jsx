import React, { useEffect, useState } from 'react'
import { Box, Stack } from '@mui/material'
import PlaylistsMenu from './PlaylistsMenu'
import PlaylistsMergeForm from './PlaylistsMergeForm'
import SongsList from './SongsList'
import SearchBar from './SearchBar'


function Playlists () {

  const [playlistAry, setPlaylistAry] = useState([])
  const [selectedPlaylist, setSelectedPlaylist] = useState();
  const [showSongs, setShowSongs] = useState(false);
  const [songsAry, setSongsAry] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9292/playlists/defaults')
    .then(r=>r.json())
    .then(data => setPlaylistAry(data))
  }, [])

  function onClickDelete (songToDelete) {
    const songs = selectedPlaylist.songs.filter(song => song.id !== songToDelete.id)
    const playlist = {...selectedPlaylist, songs:songs}
    setSongsAry(songs)
    setSelectedPlaylist(playlist)
    setPlaylistAry(playlistAry.map(existing => {
      if (existing.id === playlist.id) { return playlist }
      return existing
    }))
    fetch('http://localhost:9292/saves', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        song_id: songToDelete.id,
        playlist_id: playlist.id
      })
    }).then(() => console.log('deleted'))
  }

  function onClickMerge (playlist) {
    setSongsAry(playlist.songs);
    setSelectedPlaylist(playlist);
    setPlaylistAry([...playlistAry, playlist])
    setShowSongs(true);
  }

  function onClickPlaylist (playlist) {
    if (playlist !== selectedPlaylist) {
      setShowSongs(true);
      setSelectedPlaylist(playlist);
      setSongsAry(playlist.songs);
    } else {
      setShowSongs(!showSongs);
    }
  }

  function onClickAdd (song) {
    console.log(song)
    // const newSongsAry = addSongToPlaylist(selectedPlaylist, song);
    // const newSongPlaylist = {...selectedPlaylist,
    //   "songs": newSongsAry
    // }
    // setPlaylistAry(newSongPlaylist);
    // setSelectedPlaylist(newSongPlaylist);
    // setSongsAry(newSongsAry);
  };

  return (
    <Stack spacing={2}>
      <Box>
        <PlaylistsMenu playlistAry={playlistAry} onClickPlaylist={onClickPlaylist} />
        {/* <SearchBar onClickAdd={onClickAdd} /> */}
      </Box>
      <Box sx={{pb: 28}}>
        {selectedPlaylist && selectedPlaylist.id === "merge" ? <PlaylistsMergeForm onSubmit={onClickMerge} /> : <SongsList songsAry={songsAry} showSongs={showSongs} onClickDelete={onClickDelete} />}
      </Box>
    </Stack>
  )
}

export default Playlists