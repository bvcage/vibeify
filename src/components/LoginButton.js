import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { CLIENT_ID } from '../keys';
import { clearDB } from '../scripts/localDB.js'


function LoginButton () {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("user_id") !== null);

    function authorizeApp () {
        let query = new URLSearchParams({
            response_type: "code",
            client_id: CLIENT_ID,
            scope: "user-library-read playlist-read-private",
            redirect_uri: "http://localhost:3000/home/login",
            state: genRandomString(20),
            // code_challenge_method: "S256",
            // code_challenge: "",
            show_dialog: true,
        })
        let url = `https://accounts.spotify.com/authorize?` + query;
        const width = 600;
        const height = 800;
        const left = ( window.screen.availWidth - width ) / 2;
        const top = ( window.screen.availHeight - height ) / 2;
        const loginPopup = window.open(url, 'popup',
                `menubar=no,
                location=no,
                width=${width},
                height=${height},
                left=${left},
                top=${top},
                popup=true`);
        const checkPopup = setInterval(() => {
            if (loginPopup.window.location.href.includes("http://localhost:3000")) loginPopup.close();
            if (!loginPopup || !loginPopup.closed) return;
            clearInterval(checkPopup);
            console.log('login:', loginPopup.window.location.href);
            window.location.href = loginPopup.window.location.href;
        }, 100);
    }

    function genRandomString(length) {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const numPossible = possible.length;
        let randString = '';
        for (let i=0; i<length; ++i) {
            randString += possible.charAt(Math.floor(Math.random() * numPossible))
        }
        return randString;
    }

    function toggleLoginLogout () {
        if (isLoggedIn) {
            clearDB()
            .then(() => {
                localStorage.clear();
                setIsLoggedIn(!isLoggedIn);
                window.location.replace("http://localhost:3000")
            })
        }
        else {
            authorizeApp();
            setIsLoggedIn(!isLoggedIn);
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