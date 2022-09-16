import React from 'react'
import { Box, Paper } from '@mui/material'

function About() {
  return (
    <Box p={{ xs: 2, sm: 3, md: 5}}>
      <Paper>
        <Box p={5}>
          <Box pt={5}>
            <h1>Vibeify</h1>
            <p>Your favorite songs, reorganized by vibe.</p>
          </Box>
          <Box pt={5}>
            <h2>Introduction</h2>
            <p>Ever wish you could shuffle songs across all your playlists? Vibeify downloads your entire Spotify library and sorts it by ~vibe~ so that you can listen to all your favorite songs based on your mood.</p>
          </Box>
          <Box pt={5}>
            <h2>Instructions</h2>
            <ul>
              <li>Head on over to the Playlists tab</li>
              <li>Click on your song and Spotify will play it</li>
              <li>Search for other songs from your library</li>
              <li>Add or delete songs accordingly</li>
            </ul>
            <p>Like Vibeify? Checkout out the developers Github who created it in the footer!</p>
          </Box>
          <Box pt={5}>
            <h2>Technologies</h2>
            <p>
              This project is created with:
              <ul>
                <li>React version: 18.2.0</li>
                <li>React router version: 6.3.0</li>
              </ul>
            </p>
          </Box>
          <Box pt={5}>
            <h2>Features</h2>
            <p>
              <ul>
                <li>Users are able to login using Spotify</li>
                <li>Vibeify gets songs from your Spotify library</li>
                <li>Reshuffle your songs across playlists using audio qualities</li>
                <li>Create playlists to match your mood for the day!</li>
              </ul>
            </p>
            <h3>Future Improvements</h3>
            <p>
              <ul>
                <li>Improve logic in default shuffle</li>
                <li>Add sliders to dynamically edit playlists</li>
                <li>Add save & share functionality</li>
                <li>Allow in-app playback of music</li>
              </ul>
            </p>
          </Box>
        </Box>
      </Paper>
    </Box>

  )
}

export default About