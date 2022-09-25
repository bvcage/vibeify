const PLAYLIST_URL = "http://localhost:3001/playlists";
let USER_ID = localStorage.getItem("user_id");
let USER_URL = `http://localhost:3001/users/${USER_ID}`;

export function addSongToPlaylist (playlist, song) {
    const newSongAry = [...playlist.tracks, song];
    const patchPlaylist = {...playlist,
        "tracks": newSongAry
    }
    fetch(`${PLAYLIST_URL}/${playlist.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(patchPlaylist),
    })
    return newSongAry;
}

export async function clearDB () {
    setUserValues();
    return await fetch(PLAYLIST_URL)
    .then(r => r.json())
    .then(list => {
        return list.map(playlist => {
            return fetch(`${PLAYLIST_URL}/${playlist.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
        })
    })
    .then(() => {
        const userId = localStorage.getItem("user_id");
        const userUrl = `http://localhost:3001/users/${userId}`;
        return fetch(userUrl)
        .then(r => r.json())
        .then(user => {
            return fetch(userUrl, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({...user,
                    "playlists": [],
                    "songs": []
                })
            })
        })
    })
}

export async function getMergePlaylistId () {
    setUserValues();
    return await fetch(PLAYLIST_URL)
    .then(r => r.json())
    .then(list => {
        const numMerge = list.filter(playlist => playlist.type === "merge").length;
        return numMerge + 1;
    });
}

export function loadLocalSongIds () {
    let songIdAry = [];
    fetch(`http://localhost:3001/songs`)
    .then(r => r.json())
    .then(library => {
        library.forEach(song => songIdAry.push(song.id))
        return songIdAry;
    })
}

export async function loadSpotifyPlaylistsAry () {
    setUserValues();
    return await fetch(`${USER_URL}`)
    .then(r => r.json())
    .then(user => {return user.playlists})
}

export async function patchSongOnLocal (patchSong) {
    const url = `http://localhost:3001/songs/${patchSong.id}`
    return await fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(patchSong)
    })
    .then(r => r.json())
    .then(patch => {return patch});
}

export async function postNewPlaylist (playlist) {
    return await fetch (PLAYLIST_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(playlist)
    })
    .then(r => r.json())
}

export async function postSongsAryToLocal (songsAry) {
    let songIdAry = loadLocalSongIds();
    await songsAry.forEach(song => {
        postSongToLocal(song, songIdAry);
        songIdAry.push(song.id);
    });
    return songIdAry;
}

export async function postSongToLocal (song, songIdAry = loadLocalSongIds) {
    if (!songIdAry.find(ele => ele === song.id)) {
        await fetch(`http://localhost:3001/songs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(song),
        });
    }
}

export function removeSongFromPlaylist (playlist, songId) {
    const newTracks = playlist.tracks.filter(song => song.id !== songId);
    fetch(`${PLAYLIST_URL}/${playlist.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({...playlist,
            "tracks": newTracks
        })
    })
    return newTracks;
}

function setUserValues () {
    USER_ID = localStorage.getItem("user_id");
    USER_URL = `http://localhost:3001/users/${USER_ID}`;
}