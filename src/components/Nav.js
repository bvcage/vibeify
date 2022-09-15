import React from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { Avatar, Box, Button, ButtonGroup, Menu, MenuItem } from '@mui/material'
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ display: 'flex', gap: '8px', }}>
        <Box
          sx={{
            display: 'flex',
              '& > *': {
                m: 2,
              },
          }}
        >
        <ButtonGroup
          variant="text"
          aria-label="text button group"
          sx={{  '& button': {color: 'white' }}}
          >
          <Button sx={{textTransform: 'none'}} onClick={onClickPlaylists}>Playlists</Button>
          <Button sx={{textTransform: 'none'}} onClick={onClickAbout}>About</Button>
          <Button
            id="user-button"
            aria-controls={open ? 'user-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{textTransform: 'none'}}
          >
            <div className='login'>
              <p>{userData.display_name}</p>
              <Avatar src={userData.images[0].url}/>
            </div>
          </Button>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}><LoginButton /></MenuItem>
          </Menu>
        </ButtonGroup>
      </Box>
    </div>
  )
}

export default Nav