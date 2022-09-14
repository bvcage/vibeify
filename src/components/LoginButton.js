import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { CLIENT_ID } from '../keys';

function LoginButton () {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("user_id") !== null);

    function authorizeApp () {
        let query = new URLSearchParams({
            response_type: "code",
            client_id: CLIENT_ID,
            scope: "user-library-read playlist-read-private",
            redirect_uri: "http://localhost:3000/index.html",
            state: genRandomString(20),
            // code_challenge_method: "S256",
            // code_challenge: "",
            show_dialog: true,
        })
        let url = `https://accounts.spotify.com/authorize?` + query;
        const loginPopup = window.open(url, 'popup', 'menubar=no,width=600,height=925');
        const checkPopup = setInterval(() => {
            if (loginPopup.window.location.href.includes("http://localhost:3000/index.html")) loginPopup.close();
            if (!loginPopup || !loginPopup.closed) return;
            clearInterval(checkPopup);
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
            localStorage.clear();
            clearLocal();
        }
        else {
        authorizeApp()
        }
        setIsLoggedIn(!isLoggedIn);
    }

    function clearLocal () {
        const url = 'http://localhost:3001/songs';
        fetch(url)
        .then(r => r.json())
        .then(library => {
          library.forEach(song => {
            fetch(`${url}/${song.id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              }
            })
          })
        })
      }

    return (
        <Button
            variant='contained'
            color='success'
            onClick={toggleLoginLogout}
            >{localStorage.getItem("user_id") ? 'logout': 'login with spotify'}
        </Button>
    )

}

export default LoginButton