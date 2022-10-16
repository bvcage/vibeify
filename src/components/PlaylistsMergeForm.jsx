import React, { useEffect, useState } from 'react'
import { Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { fetchFromSinatra, saveToSinatra } from '../scripts/sinatra'

function PlaylistMergeForm ({ onSubmit }) {

   const [spotifyPlaylistsAry, setSpotifyPlaylistsAry] = useState([]);
   const [selected, setSelected] = useState({});

   useEffect(() => {
      fetchFromSinatra('playlists')
      .then(data => setSpotifyPlaylistsAry(data));
   }, [])

   function handleCheckbox (event) {
      if (event.target.checked) {
         setSelected({...selected,
            [event.target.value]: event.target.checked
         })
      } else {
         let temp = {...selected}
         delete temp[event.target.value]
         setSelected(temp)
      }
   }

   function handleSubmit (event) {
      event.preventDefault();
      saveToSinatra('/playlists/merge', Object.keys(selected))
      .then(playlist => onSubmit(playlist))
   }

   const playlistsList = spotifyPlaylistsAry.map(playlist => {
      return (
         <FormControlLabel
            key={playlist.id}
            control={<Checkbox value={playlist.id} label={playlist.name} onChange={handleCheckbox} />}
            label={playlist.name}
         />
      )
   });

   return (
      <form onSubmit={handleSubmit}>
         <FormGroup>
            {playlistsList}
            <Button type="submit">submit</Button>
         </FormGroup>
      </form>
   )
}

export default PlaylistMergeForm;