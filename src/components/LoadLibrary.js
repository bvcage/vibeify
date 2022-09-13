import React from 'react';
import "../App.css";
import { getSpotifyLibrary } from "../scripts/spotifyLibrary";

function LoadLibrary() {

    let done = false;
    getSpotifyLibrary().then(() => {done = true});

    const checkDone = setInterval(() => {
        if (!done) return;
        clearInterval(checkDone);
        window.location.replace("http://localhost:3000/main");
    }, 1000);

    return (
        <p>Loading your library...</p>
    )
}

export default LoadLibrary