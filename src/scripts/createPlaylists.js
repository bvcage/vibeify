const PLAYLIST_LIMIT = 14;
const PLAYLISTS_URL = "http://localhost:3001/playlists";
const SONGS_URL = "http://localhost:3001/songs";

export async function clearPlaylists () {
    await fetch(PLAYLISTS_URL)
        .then(r => r.json())
        .then(list => {
            list.forEach(playlist => {
                fetch(`${PLAYLISTS_URL}/${playlist.id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            })
        })
}

export async function createDefaultPlaylists () {

    let playlistAry = await fetch(PLAYLISTS_URL)
        .then(r => r.json())
        .then(list => {
            let tempAry = [];
            list.forEach(playlist => {
                tempAry.push(playlist);
            })
            return tempAry;
        })

    if (!!playlistAry) {
        return await fetch(SONGS_URL)
        .then(r => r.json())
        .then(library => {
            library.forEach(song => {
                // mood playlists
                if (isHappy(song)) addToPlaylist("mood", "happy", song)
                else if (isSad(song)) addToPlaylist("mood", "sad", song);
                else if (isWorkout(song)) addToPlaylist('mood', 'workout', song)
            })
            return playlistAry;
        })
    } else return;

    function addToPlaylist (playlistType, playlistId, song) {
        const playlist = playlistAry.find(ele => ele.id === playlistId);
        if (!!playlist) {
            if (playlist.tracks.length >= PLAYLIST_LIMIT) return;   // limit # of songs on default playlist
            if (playlist.tracks.find(ele => ele.album.name === song.album.name)) return; // limit default playlist to 1 song per album
        }

        if (!playlist) {
            const newPlaylist = {
                "id": playlistId,
                "type": playlistType,
                "tracks": [song]
            }
            playlistAry.push(newPlaylist);
            fetch(PLAYLISTS_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newPlaylist)
            })
        } else {
            const patchPlaylist = {...playlist,
                "tracks": [...playlist.tracks, song]
            }
            playlistAry = playlistAry.map(item => {
                if (item.id === patchPlaylist.id) return patchPlaylist;
                return item;
            })
            fetch(`${PLAYLISTS_URL}/${playlist.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(patchPlaylist)
            })
        }
    }

    function isHappy (song) {
        const { energy, loudness, valence } = song.audio_features;
        if (valence > 0.8
            && energy > 0.7
            && loudness > -6) return true;
        return false;
    }
    
    function isSad (song) {
        const { energy, valence } = song.audio_features;
        if (valence < 0.2 && energy < 0.4) return true;
        return false;
    }

    function isWorkout (song) {
        const { energy, valence, loudness, tempo } = song.audio_features;
        if (valence > 0.5
            && energy > 0.5
            && tempo > 160
            && loudness > -6
            ) return true;
            return false;
    }
}

export function createSimilarPlaylist (songId) {

}