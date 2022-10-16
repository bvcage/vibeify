import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import { authorizeVibeify } from '../scripts/spotify'
import { saveToSinatra } from '../scripts/sinatra'


function LoginButton () {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("user_id") !== null);
    const navigate = useNavigate();

    async function toggleLoginLogout () {
        if (isLoggedIn) {
            // clearDB()
            // .then(() => {
                localStorage.clear();
                setIsLoggedIn(!isLoggedIn);
                window.location.replace('http://localhost:3000')
            // })
        }
        else {
            const user = await authorizeVibeify()
            saveToSinatra('/users', user)
            .then(user => localStorage.setItem('user_id', user.id))
            setIsLoggedIn(!isLoggedIn)
            navigate('/loading')
        }
    }

    return (
        <Button
            sx={{textTransform: 'none'}}
            variant='contained'
            color='success'
            onClick={toggleLoginLogout}
            >{localStorage.getItem("user_id") ? 'Logout' : 'Login with Spotify'}
        </Button>
    )

}

export default LoginButton