import React from 'react';
import { getSpotifyLibrary } from "../scripts/spotifyLibrary";
import { useNavigate } from "react-router-dom";

function LoadLibrary() {

    const navigate = useNavigate();

    let done = false;
    getSpotifyLibrary().then(() => {done = true});

    const checkDone = setInterval(() => {
        if (!done) return;
        clearInterval(checkDone);
        navigate("/main/playlists");
    }, 1000);

    return (
        <p>Loading your library...</p>
    )
}

export default LoadLibrary