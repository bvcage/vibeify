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
          <Box pt={5}>Create a playlist base on your mood!</Box>
          <Box pt={5}>Vibeify About Me</Box>
          <Box pt={5}>Vibeify About Me</Box>
          <Box pt={5}>Vibeify About Me</Box>
          <Box pt={5}>Vibeify About Me</Box>
          <Box pt={5}>Vibeify About Me</Box>
          <Box pt={5}>Vibeify About Me</Box>
          </Box>
      </Paper>
    </Box>
    //  <Box style={{height:"100vh"}}
    //  px={{ xs: 3, sm: 10 }}
    //  py={{ xs: 3, sm: 3 }}
    //  bgcolor=""
    //  color="white">
    //    <Container>
    //      <Card direction="row" spacing={2} justifyContent="center">
    //        About Vibeify
    //        Create a playlist to match your mood!
    //      </Card> 
    //    </Container>  
    //  </Box>
  )
}

export default About