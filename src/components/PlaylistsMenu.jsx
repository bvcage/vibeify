import React from "react";
import PlaylistCard from "./PlaylistCard";
import { Grid } from "@mui/material";

function PlaylistMenu ( props ) {
  const { playlistAry, onClickPlaylist } = props

  const playlistCards = playlistAry.map((playlist) => {
    return (
      <Grid item xs={3} key={playlist.id}>
        <PlaylistCard
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
        <PlaylistCard
          key='merge'
          playlist={{id: 'merge'}}
          onClickPlaylist={onClickPlaylist}
        />
      </Grid>
      {/* pre-made playlists */}
      {playlistCards}
    </Grid>
  );
}

export default PlaylistMenu;