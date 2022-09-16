import React, { useState } from "react";
import PlaylistCard from "./PlaylistCard";
import { Container, Grid, Card } from "@mui/material";

import images from "../data/playlistImages.json"

function PlaylistMenu({ playlistAry, onClickPlaylist }) {


  return (
    <Grid sx={{width: 1000, marginLeft: '128px'}}>
      {playlistAry.map((playlist) => {
        return (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              onClickPlaylist={onClickPlaylist}
              image={images[playlist.id]}
            />
        );
      })}
    </Grid>
  );
}

export default PlaylistMenu;