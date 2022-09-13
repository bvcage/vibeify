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