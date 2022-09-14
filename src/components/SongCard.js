import React from 'react'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import "../App.css"


function SongCard({ song, onClickDelete }) {

  const { id, name, album, artists, url } = song;

  function handleRemoveSong () {
    onClickDelete(id);
  }

  function showSongDetails () {   // for testing purposes
    console.log(song.audio_features);
  }

  return (
    <Card sx={{ maxWidth: 400, display: 'flex' }} onClick={showSongDetails}>

      <CardMedia
        component="img"
        sx={{ width: 120, height: 120 }}
        image={album.imageUrl}
        alt={album.name + " album art"}
      />

      <CardContent sx={{display: 'flex', flexDirection: 'column'}}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          >{name}
        </a>
        <Typography noWrap>
          {album.name}
        </Typography>
        <Typography noWrap>
          {artists.map(artist => artist.name).join(", ")}
        </Typography>
        <div className="trash-can">
          <span onClick={handleRemoveSong}>🗑</span>
        </div>
      </CardContent>

    </Card>
  )
}

export default SongCard