const PLAYLIST_URL = "http://localhost:3001/playlists";
const SONGS_URL = "http://localhost:3001/songs";

export function clearDB () {
    fetch(PLAYLIST_URL)
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
    fetch(SONGS_URL)
    .then(r => r.json())
    .then(library => {
        library.forEach(song => {
            fetch(`${SONGS_URL}/${song.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
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