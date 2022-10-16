import React, { useState } from 'react'
import { Box, Button, FormControl, TextField } from '@mui/material'

function PlaylistsSaveForm (props) {
   const { playlist, onClickSubmit } = props

   const [save, setSave] = useState(playlist)

   function handleChange (e) {
      setSave({...save, [e.target.name]: e.target.value})
   }

   function handleSubmit (e) {
      e.preventDefault()
      onClickSubmit(save)
   }

   return (
      <Box id="playlist-save-form" component="form" autoComplete='off'>
         <h2>save to spotify</h2>
         <FormControl>
            <TextField
               id="outlined-name"
               name="name"
               label="name"
               variant="outlined"
               value={save.name}
               onChange={handleChange} />
            <TextField
               id="outlined-description"
               name="description"
               label="description"
               variant="outlined"
               multiline
               rows={4}
               value={save.description}
               onChange={handleChange} />
            <TextField 
               id="outlined-image-url"
               name="image_url"
               label="cover image?"
               variant="outlined"
               value={save.image_url}
               onChange={handleChange} />
            <Button type='submit' onClick={handleSubmit}>save</Button>
         </FormControl>
      </Box>
   )
}

export default PlaylistsSaveForm