import React from 'react'
import { Card, Grid } from '@mui/material'
import "../App.css"

function SongCard({ song }) {
  const { name, album, artists, url } = song;
  return (
    <Card sx={{ maxWidth: 345 }}>

      <Grid
        container
        direction="row"
        alignItems="center"
      >

        <Grid item xs>
          <img className="album-art" src={album.imageUrl} alt={'album art'} />
        </Grid>

        <Grid item xs>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            >{name}
          </a>
          <br />
          {album.name}
          <br />
          {artists.map(artist => artist.name).join(", ")}
        </Grid>
        
      </Grid>

    </Card>
  )
}

export default SongCard