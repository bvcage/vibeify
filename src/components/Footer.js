import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'

function Footer() {
  return (
    <footer>
      <Box 
            px={{ xs: 3, sm: 10 }}
            py={{ xs: 3, sm: 3 }}
            bgcolor="text.secondary"
            color="white">
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box fontWeight="bold" borderBottom ={2}>VIBEIFY DEVELOPERS</Box>
            </Grid>
            <Grid item xs={3}>
              <Link href="https://github.com/bvcage" color="inherit">
                Bailey Cage
              </Link>
            </Grid>
            <Grid item xs={3}>
              <Link href="https://github.com/erkhart96" color="inherit">
                Ben Erkhart
              </Link>
            </Grid>
            <Grid item xs={3}>
              <Link href="https://github.com/Acavazos19" color="inherit">
                Albert Cavazos
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  )
}

export default Footer