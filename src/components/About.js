import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'


function About() {
  return (
      <Box p={{ xs: 2, sm: 3, md: 5}}>
      <Paper>
        <Box p={5}>
          <div>Vibeify</div>
          <Box pt={5}>Users are able to login using personal Spotify account accessing their own playlist</Box>
          <Box pt={5}>Create your playlist to match your mood for the day!</Box>
          <Box pt={5}>Click on your song and Spotify will play it</Box>
          <Box pt={5}>Users can search up new songs and add or delete them accordingly</Box>
          <Box pt={5}>Like Vibeify? Checkout out the developers Github who created it in the footer!</Box>
          <Box pt={5}>Users are able to Log back out when they are done listening</Box>
          <Box pt={5}>Match your vibe with no monthly subscription</Box>
          </Box>
      </Paper>
    </Box>

  )
}

export default About