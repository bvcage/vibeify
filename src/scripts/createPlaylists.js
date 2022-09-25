import { fetchData, fetchInfo } from "./spotifyLibrary"

const PLAYLIST_LIMIT = 15;
const PLAYLISTS_URL = "http://localhost:3001/playlists";

export async function clearPlaylists () {
    return await fetch(PLAYLISTS_URL)
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
    });
}

export async function createDefaultPlaylists () {

    const userId = localStorage.getItem("user_id");
    const userUrl = `http://localhost:3001/users/${userId}`;

    // get existing playlists list
    let playlistAry = await fetch(PLAYLISTS_URL)
        .then(r => r.json())
        .then(list => {return list})

    // create merge playlist placeholder
    playlistAry.push(createPlaylist("merge", "custom"))

    // create default playlists
    if (!!playlistAry) {
        return await fetch(userUrl)
        .then(r => r.json())
        .then(user => {
            user.songs.forEach(async (song) => {
                // mood playlists
                if (isHappy(song)) await addToPlaylist("mood", "happy", song)
                else if (isSad(song)) await addToPlaylist("mood", "sad", song);
                else if (isWorkout(song)) await addToPlaylist('mood', 'workout', song)
            })
            return playlistAry;
        })
    } else return;

    async function addToPlaylist (playlistType, playlistId, song) {

        const playlist = playlistAry.find(ele => ele.id === playlistId);
        
        if (!!playlist) {
            if (playlist.tracks.length >= PLAYLIST_LIMIT) return;   // limit # of songs on default playlist
            if (playlist.tracks.find(ele => ele.album.name === song.album.name)) return; // limit default playlist to 1 song per album
        }

        if (!playlist) {
            const newPlaylist = createPlaylist(playlistId, playlistType);
            playlistAry.push(newPlaylist);
        } else {
            const patchPlaylist = {...playlist,
                "tracks": [...playlist.tracks, song]
            }
            playlistAry = playlistAry.map(item => {
                if (item.id === patchPlaylist.id) return patchPlaylist;
                return item;
            })
            return await fetch(`${PLAYLISTS_URL}/${playlist.id}`, {
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

export async function createMergePlaylist (playlistIdList) {
    console.log(playlistIdList);

    // get tracks for each playlist
    let playlistTracksAry = await Promise.all(playlistIdList.map(async (playlistId) => {
        const apiUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
        // get tracks list
        const info = await fetchInfo(apiUrl);
        const spotifyDataAry = await fetchData(apiUrl, info);
        // save tracks to array
        let tracksAry = [];
        spotifyDataAry.forEach(entry => tracksAry.push(...(entry.items)));
        return tracksAry;
    }))
    
    // remove extra data from spotify & flatten into 1 array
    playlistTracksAry = playlistTracksAry.map(tracksAry => {
        return tracksAry.map(song => song.track);
    }).flat();

    // remove duplicates
    playlistTracksAry = playlistTracksAry.filter((e1, i, ary) => {
        return ary.indexOf(ary.find(e2 => e2.id === e1.id)) === i;
    })

    // shuffle songs
    playlistTracksAry = shuffleTracksAry(playlistTracksAry);
    
    return playlistTracksAry;
}

function createPlaylist (playlistId, playlistType) {
    const newPlaylist = {
        "id": playlistId,
        "type": playlistType,
        "tracks": []
    }
    fetch(PLAYLISTS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPlaylist)
    })
    return newPlaylist;
}

export function createSimilarPlaylist (songId) {

}

function shuffleTracksAry(tracksAry) {
    let tracksAryCopy = [...tracksAry]
    let shuffledAry = [];
    let numTracks = tracksAry.length;

    while (numTracks > 0) {
        const index = Math.floor(Math.random() * numTracks);
        shuffledAry.push(tracksAryCopy[index])
        tracksAryCopy.splice(index, 1);
        numTracks--;
    }
    
    return shuffledAry;
}