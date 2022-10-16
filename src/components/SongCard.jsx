import React from 'react'
import { Card, CardContent, CardMedia, Link, IconButton, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import '../images/logo300.png'


function SongCard({ song, onClickDelete }) {
  const primary = red[50]
  const { id, name, artist, album_name, album_art_url, spotify_url } = song

  function handleRemoveSong () {
    onClickDelete(id)
  }

  function showSongDetails () {   // for testing
    console.log(song.audio_features)
  }

  return (
    <Card raised={true} sx={{ maxWidth: 400, maxHeight: 120, display: 'flex', backgroundColor: 'rgba(0, 0, 0, 0.6)'}} onClick={showSongDetails}>

      <CardMedia
        component="img"
        sx={{ width: 120, height: 120 }}
        image={album_art_url}
        alt={album_name + " album art"}
      />

      <CardContent sx={{display: 'flex', flexDirection: 'column', width: 370 }}>
        <Link
          href={spotify_url}
          target="_blank"
          rel="noopener noreferrer"
          color={primary}
          >{name}
        </Link>
        <Typography variant='body2' sx={{maxWidth: 200, color: 'white'}}>
          {album_name}
        </Typography>
        <Typography variant='body1' sx={{color: 'white'}}>
          {artist}
        </Typography>
      </CardContent>
        <div className='deleteDiv'>
          <IconButton size='small' onClick={handleRemoveSong}>🗑</IconButton>
        </div>
    </Card>
  )
}

export default SongCard