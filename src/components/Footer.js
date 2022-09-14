import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'

function Footer() {
  return (
    <footer>
      <Box px={{ xs: 3, sm: 10 }}
            py={{ xs: 3, sm: 3 }}
            textAlign="center" bgcolor="text.secondary"
            color="white">
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Box borderBottom ={2}>VIBEIFY DEVELOPERS</Box>
              <Box>
                <Link href="https://github.com/bvcage" color="inherit">
                  Bailey Cage
                </Link>
              </Box>
              <Box>
                <Link href="https://github.com/erkhart96" color="inherit">
                  Ben Erkhart
                </Link>
              </Box>
              <Box>
                <Link href="https://github.com/Acavazos19" color="inherit">
                  Albert Cavazos
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={{xs: 5, sm: 5}} pb={{xs: 5, sm:0}}>
            Vibeify &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  )
}

export default Footer