import React from "react";
import { Button, Card } from "@mui/material";

function PlaylistsCard ( props ) {
  const { playlist, onClickPlaylist } = props

  function handleClick() {
    onClickPlaylist(playlist);
  }

  return (
    <Card
      onClick={handleClick}
      sx={{height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'}}
      >
      <Button
        variant='contained'
        fullWidth
        sx={{height: '100%'}}
        >{playlist.name}
      </Button>
    </Card>
  );
}

export default PlaylistsCard;