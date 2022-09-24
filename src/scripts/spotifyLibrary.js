import noAlbumArt from '../No-album-art.png'

export function getSpotifyLibrary () {

    console.log('getting spotify library...');

    let accessToken = localStorage.getItem("access_token");
    let userId = localStorage.getItem("user_id");

    function fetchAudioFeatures (songId) {
        let url = `https://api.spotify.com/v1/audio-features`;
        if (songId.includes(',')) {     // multiple song id's
            const query = new URLSearchParams({
                ids: songId
            })
            url += `?${query}`;
        } else {                        // single song id
            url += `/${songId}`
        }
        return fetch(url, {
            headers: {
                "Authorization": 'Bearer ' + accessToken,
                "Content-Type": "application/json"
            }
        })
        .then(r => r.json())
        .then(data => {return data});
    }

    async function fetchAudioFeaturesForLibrary () {
        console.log('fetching audio features ...');
        const url = `http://localhost:3001/users/${userId}`;
        const user = await fetch(url).then(r => r.json());
        const filteredAry = user.songs.filter(song => {
            if (!!song.id) {
                return true
            } else {
                return false
            }
        });
        
        const songIdAry = filteredAry.map(song => song.id);
        const numSongs = songIdAry.length;
        const callLimit = 100;
        let featuresAry = [];
        for (let i=0; i<numSongs; i+= callLimit) {
            const slice = songIdAry.slice(i, i + callLimit).join();
            const returnAry = await fetchAudioFeatures(slice);
            featuresAry.push(...returnAry.audio_features);
        }

        const newSongsAry = filteredAry.map(song => {
            return {...song,
                audio_features: featuresAry.find(entry => entry.id === song.id)
            }
        })
        return await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...user,
                "songs": newSongsAry
            })
        })
    }

    async function fetchData (apiUrl, info) {
        // setup return object
        let data = [];
        // check apiUrl has query character at end
        if (apiUrl.charAt(apiUrl.length - 1) !== '?') {apiUrl += '?'}
        // call to API
        const limit = 50;
        const numCalls = Math.ceil(info.total / limit);
        for (let i = 0; i < numCalls; ++i) {
            const query = new URLSearchParams({
                offset: limit * i,
                limit: limit
            })
            const fetchUrl = apiUrl + query;
            await fetch(fetchUrl, {
                headers: {
                    "Authorization": 'Bearer ' + accessToken,
                    "Content-Type": "application/json"
                }
            })
            .then(r => r.json())
            .then(f => data.push(f))
        }
        return data;
    }
    
    function fetchInfo (apiUrl) {
        const url = apiUrl + "?limit=1";
        return fetch (url, {
            headers: {
                "Authorization": 'Bearer ' + accessToken,
                "Content-Type": "application/json"
            }
        })
        .then(r => r.json())
        .then(data => {return data})
    }

    async function fetchTracksForPlaylistAry (playlistAry) {
        let allPlaylistSongArys = [];
        playlistAry.forEach(playlist => {
            let songsAry = fetchData(playlist.tracks.href, playlist.tracks);
            if (songsAry.length > 1) {
                let tempAry = [];
                for (let i=0; i < songsAry.length; ++i) {
                    tempAry.push(...songsAry[i].items)
                }
                songsAry = tempAry;
            }
            allPlaylistSongArys.push(songsAry);
        });
        allPlaylistSongArys = await Promise.all(allPlaylistSongArys);

        let returnAry = [];
        allPlaylistSongArys.forEach(playlist => {   
            playlist.forEach(songAry => {
                songAry.items.forEach(item => {
                    returnAry.push(item.track);
                });
            })
        })
        return returnAry;
    }

    async function fetchUserLibrary () {
        console.log('fetching user library...');
        await fetchUserLikedSongs()
        await fetchUserPlaylists()
        await fetchAudioFeaturesForLibrary()
    }

    async function fetchUserLikedSongs () {
        console.log('fetching liked songs...');
        const apiUrl = "https://api.spotify.com/v1/me/tracks";
        const infoObj = await fetchInfo(apiUrl);
        const dataAry = await fetchData(apiUrl, infoObj);
        let likedSongsAry = [];
        dataAry.forEach(entry => {
            entry.items.forEach(item => {
                likedSongsAry.push(item.track);
            })
        });
        likedSongsAry = parseSpotifyTracksAry(likedSongsAry);
        return await postSongsAryToLocal(likedSongsAry);
    }

    async function fetchUserPlaylists () {
        console.log('fetching playlits...');
        const apiUrl = "https://api.spotify.com/v1/me/playlists";
        const info = await fetchInfo(apiUrl);
        const dataAry = await fetchData(apiUrl, info);
    
        let playlistsAry = [];
        dataAry.forEach(entry => playlistsAry.push(...(entry.items)));
        playlistsAry = playlistsAry.filter(playlist => playlist.owner.id === userId);
        let allTracksAry = await fetchTracksForPlaylistAry(playlistsAry);
        
        allTracksAry = parseSpotifyTracksAry(allTracksAry);
        await postSongsAryToLocal(allTracksAry);
        return true;
    }

    function parseSpotifyTracksAry (tracksAry) {
        const songsAry = [];
        tracksAry.forEach(track => {
            let albumEntry = {
                'id': null,
                'name': track.album.name,
                'url': null,
                'imageUrl': noAlbumArt
            }
            if (!track.is_local) {
                albumEntry = {...albumEntry,
                    'id': track.album.id,
                    'url': track.album.external_urls.spotify,
                    'imageUrl': track.album.images[0].url
                }
            }

            const artistsAry = track.artists.map(artist => {
                return {
                    "id": artist.id,
                    "name": artist.name,
                    "url": artist.external_urls.spotify,
                }
            })
            const songEntry = {
                "id": track.id,
                "name": track.name,
                "album": albumEntry,
                "artists": artistsAry,
                "url": track.external_urls.spotify,
                "uri": track.uri,
            }
            songsAry.push(songEntry);
        })
        return songsAry;
    }

    async function postSongsAryToLocal (newSongsAry) {
        await fetch(`http://localhost:3001/users/${userId}`)
        .then(r => r.json())
        .then(async (user) => {
            let uniqueSongsAry = [...user.songs];
            newSongsAry.forEach(song => {
                if (!uniqueSongsAry.find(ele => ele.id === song.id)) {
                    uniqueSongsAry.push(song);
                }
            })
            await fetch(`http://localhost:3001/users/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "songs": [...uniqueSongsAry]
                })
            })
        })
    }

    return fetchUserLibrary();

}

export async function savePlaylistToSpotify (songsAry) {
    const userId = localStorage.getItem("user_id");
    const accessToken = localStorage.getItem("access_token");

    // create spotify playlist
    let url = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const newPlaylist = {
        name: "My Vibeify Playlist",
        public: false,
        description: "Created with Vibeify",
    }
    const playlist = await fetch (url, {
        method: "POST",
        headers: {
            "Authorization": 'Bearer ' + accessToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPlaylist)
    }).then(r => r.json());

    // upload songs to new playlist
    console.log(playlist)
    url = `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`;
    console.log(url);
    const songList = songsAry.map(song => song.uri);
    fetch (url, {
        method: "POST",
        headers: {
            "Authorization": 'Bearer ' + accessToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "uris": songList
        })
    })
    
}