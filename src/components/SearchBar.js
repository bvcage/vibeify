import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { Autocomplete, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function SearchBar({ onClickAdd }) {
    const [songs, setSongs] = useState([])
    const [open, setOpen] = useState(false)
    let searchTerm = ''

    const darkTheme = createTheme({
      palette: {
        mode: 'dark',
      },
    });

    useEffect(() => {
        fetch('http://localhost:3001/songs')
        .then((res) => res.json())
        .then((data) => setSongs(data))
    }, [])

    return (
      <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Autocomplete
        value={searchTerm}  
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        options={songs}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option;
          }
          return (option.artists[0].name + option.name)
        }}
        open={open}
        onInputChange={(_, searchTerm) => {
          if (searchTerm.length === 0) {
            if (open) setOpen(false);
          } else {
            if (!open) setOpen(true);
          }
        }}
        onClose={() => setOpen(false)}
        renderOption={(props, option) => <Box><Button onClick={() => onClickAdd(option)}>+ Add</Button>{option.name} - {option.artists[0].name}</Box>}
        sx={{ width: 1152, paddingTop: '15px' }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Search for a song..." />
        )}
      />
      </ThemeProvider>
    );
}

export default SearchBar