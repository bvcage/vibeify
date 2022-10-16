import React from "react"
import { Grid } from "@mui/material"
import PlaylistsCard from "./PlaylistsCard"


function PlaylistsMenu ( props ) {
  const { playlistAry, onClickPlaylist } = props

  const playlistCards = playlistAry.map((playlist) => {
    return (
      <Grid item xs={3} key={playlist.id}>
        <PlaylistsCard
          key={playlist.id}
          playlist={playlist}
          onClickPlaylist={onClickPlaylist}
        />
      </Grid>
    );
  })

  return (
    <Grid container spacing={1}>
      {/* merge button */}
      <Grid item xs={3} key='merge'>
        <PlaylistsCard
          key='merge'
          playlist={{id: 'merge', name: 'merge'}}
          onClickPlaylist={onClickPlaylist}
        />
      </Grid>
      {/* pre-made playlists */}
      {playlistAry.length > 0 ?
        playlistCards :
        <Grid item xs={3} key='pend'>
          <PlaylistsCard
            key='pend'
            playlist={{name: 'generating playlists...'}}
            onClickPlaylist={()=>console.log('just a minute !')}
          />
        </Grid>
      }
    </Grid>
  );
}

export default PlaylistsMenu;