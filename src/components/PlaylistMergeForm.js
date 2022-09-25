import { useEffect, useState } from 'react';
import { loadSpotifyPlaylistsAry } from '../scripts/localDB'
import { Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { createMergePlaylist } from '../scripts/createPlaylists'

function PlaylistMergeForm ({ onSubmit }) {

   const [spotifyPlaylistsAry, setSpotifyPlaylistsAry] = useState([]);
   const [formValues, setFormValues] = useState({});

   useEffect(() => {
      loadSpotifyPlaylistsAry()
      .then(data => setSpotifyPlaylistsAry(data));
   }, [])

   function handleCheckbox (event) {
      if (event.target.checked) {
         setFormValues({...formValues,
            [event.target.value]: event.target.checked
         })
      } else {
         let temp = {...formValues}
         delete temp[event.target.value]
         setFormValues(temp)
      }
   }

   function handleSubmit (event) {
      event.preventDefault();
      createMergePlaylist(Object.keys(formValues))
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