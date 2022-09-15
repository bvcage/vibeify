import React from 'react'
import Link from '@mui/material/Link'
import { red } from '@mui/material/colors'
import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material'
import "../App.css"


function SongCard({ song, onClickDelete }) {
  const primary = red[50]
  const { id, name, album, artists, url } = song;

  function handleRemoveSong () {
    onClickDelete(id);
  }

  function showSongDetails () {   // for testing purposes
    console.log(song.audio_features);
  }

  return (
    <Card raised='true' sx={{ maxWidth: 400, maxHeight: 120, display: 'flex', backgroundColor: 'rgba(0, 0, 0, 0.6)'}} onClick={showSongDetails}>

      <CardMedia
        component="img"
        sx={{ width: 120, height: 120 }}
        image={album.imageUrl}
        alt={album.name + " album art"}
      />

      <CardContent sx={{display: 'flex', flexDirection: 'column', width: 370, }}>
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          color={primary}
          >{name}
        </Link>
        <Typography variant='body2' sx={{maxWidth: 200, color: 'white'}}>
          {album.name}
        </Typography>
        <Typography variant='body1' sx={{color: 'white'}}>
          {artists.map(artist => artist.name).join(", ")}
        </Typography>
      </CardContent>
        <div className='deleteDiv'>
        <IconButton size='small' onClick={handleRemoveSong}>🗑</IconButton>
        </div>
    </Card>
  )
}

export default SongCard