const PLAYLIST_URL = "http://localhost:3001/playlists";
const USER_ID = localStorage.getItem("user_id");
const USER_URL = `http://localhost:3001/users/${USER_ID}`;

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
    return await fetch(PLAYLIST_URL)
    .then(r => r.json())
    .then(list => {
        list.forEach(playlist => {
            fetch(`${PLAYLIST_URL}/${playlist.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
        })
    })
    .then(async () => {
        return await fetch(USER_URL)
        .then(r => r.json())
        .then(user => {
            return fetch(USER_URL, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({...user,
                    "songs": []
                })
            })
        })
    })
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