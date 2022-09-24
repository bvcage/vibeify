import React from "react";
import PlaylistCard from "./PlaylistCard";
import { Grid } from "@mui/material";

import images from "../data/playlistImages.json"

function PlaylistMenu({ playlistAry, onClickPlaylist }) {

  const playlistCards = playlistAry.map((playlist) => {
    return (
        <PlaylistCard
          key={playlist.id}
          playlist={playlist}
          onClickPlaylist={onClickPlaylist}
          image={images[playlist.id]}
        />
    );
  })

  return (
    <Grid sx={{width: 1000, marginLeft: '128px'}}>
      {playlistCards}
    </Grid>
  );
}

export default PlaylistMenu;