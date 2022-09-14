import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function SearchBar() {

    const [songs, setSongs] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filterSongList, setFilterSongList] = useState([])


    useEffect(() => {
        fetch('http://localhost:3001/songs')
        .then((res) => res.json())
        .then((data) => setSongs(data))
    }, [])

    const handleFilter = (e) => {
        const searchWord = e.target.value;
        setSearchTerm(searchWord)
        const newFilter = songs.filter((song) => {
            return (song.name.toLowerCase().includes(searchWord.toLowerCase()) ||
            song.artists[0].name.toLowerCase().includes(searchWord.toLowerCase()))
        });

        if (searchWord === '') {
            setFilterSongList([]);
        } else {
            setFilterSongList(newFilter)
        }
    };


  return (
    <Box
      sx={{
        width: 852,
        maxWidth: '100%',
        paddingTop: '12px'
      }}
    >
    <div>
      <TextField fullWidth label="Search for a song..." id="fullWidth" value={searchTerm} onChange={handleFilter} />
    </div>
    {filterSongList.length != 0 && (
        <div>
            {filterSongList.slice(0, 10).map((value, key) => {
                return (
                    <p>{value.name} - {value.artists[0].name}</p>
                )
            })}
        </div>
    )}
    </Box>
  )
}

export default SearchBar