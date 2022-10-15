import React from "react";
import PlaylistCard from "./PlaylistCard";
import { Grid } from "@mui/material";

function PlaylistMenu({ playlistAry, onClickPlaylist }) {

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
      {playlistCards}
    </Grid>
  );
}

export default PlaylistMenu;