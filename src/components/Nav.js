import React from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import ButtonGroup from '@mui/material/ButtonGroup'
import Box from '@mui/material/Box'
import LoginButton from './LoginButton'



function Nav() {

  const userData = (JSON.parse(localStorage.getItem("user_profile")))
  const UserButton = styled(Button) ({
    textTransform: 'none',
    color: 'white',
    paddingTop: '8px'
  })
  
  const navigate = useNavigate();
  
  const onClickPlaylists = () => {
    navigate('/main/playlists')
  };
  const onClickAbout = () => {
    navigate('/main/about')
  }

  return (
  <>
    <div style={{ display: 'flex', gap: '8px', }}>
        <Box
        sx={{
        display: 'flex',
        '& > *': {
            m: 2,
        },
        }}
    >
        <ButtonGroup variant="text" aria-label="text button group" sx={{  '& button': {color: 'white' }}}>
        <Button sx={{textTransform: 'none'}} onClick={onClickPlaylists}>Playlists</Button>
        <Button sx={{textTransform: 'none'}} onClick={onClickAbout}>About</Button>
        </ButtonGroup>
    </Box>
    <div>
        <div className='login'>
            <UserButton>
                <div className='avatar'>
            <LoginButton />        
            <Avatar src={userData.images[0].url}/>
                </div>
            <h3>{userData.display_name}</h3>
            </UserButton>
        </div>
    </div>
    </div>
  </>
)
}

export default Nav