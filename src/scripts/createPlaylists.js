import { isDisabled } from "@testing-library/user-event/dist/utils";

const PLAYLISTS_URL = "http://localhost:3001/playlists";
const SONGS_URL = "http://localhost:3001/songs";
const initPlaylist = {
    "type": null,
    "tracks": []
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

    return fetch(SONGS_URL)
    .then(r => r.json())
    .then(library => {
        library.forEach(song => {
            // mood playlists
            if (isHappy(song)) addToPlaylist("mood", "happy", song);
            if (isSad(song)) addToPlaylist("mood", "sad", song);
        })
        return playlistAry;
    })

    function addToPlaylist (playlistType, playlistId, song) {
        const playlist = playlistAry.find(ele => ele.id === playlistId);
        if (!!playlist && playlist.tracks.length < 15) {
            const patchPlaylist = {...playlist,
                "tracks": [...playlist.tracks, song]
            }
            fetch(`${PLAYLISTS_URL}/${playlist.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(patchPlaylist)
            })
            playlistAry = playlistAry.map(item => {
                if (item.id === patchPlaylist.id) return patchPlaylist;
                return item;
            })
        } else if (!playlist) {
            const newPlaylist = {
                "id": playlistId,
                "type": playlistType,
                "tracks": [song]
            }
            fetch(PLAYLISTS_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newPlaylist)
            })
            playlistAry.push(newPlaylist);
        }
        return;
    }

    function isHappy (song) {
        const { valence } = song.audio_features;
        if (valence > 0.8) return true;
        else return false;
    }
    
    function isSad (song) {
        const { valence } = song.audio_features;
        if (valence < 0.2) return true;
        return false;
    }
}

export function createSimilarPlaylist (songId) {

}