import { Base64 } from 'js-base64';
import { CLIENT_ID, CLIENT_SECRET, BASE_URL } from '../keys';

let accessToken = localStorage.getItem("access_token");

export function loginUser (code) {

    function fetchAccessToken () {
        console.log('fetching access token ...');
        const query = new URLSearchParams({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: `http://localhost:3000/home/login`,
            client_id: CLIENT_ID,
        });
        const url = `https://accounts.spotify.com/api/token?` + query;
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + Base64.encode(CLIENT_ID + ':' + CLIENT_SECRET).toString()
            },
            body: query,
        })
        .then(r => r.json())
        .then(data => {
            accessToken = data.access_token;
            localStorage.setItem("access_token", accessToken);
            return accessToken;
        })
        .catch(error => console.log(error))
    }
    
    async function fetchUserProfile () {
        const url = "https://api.spotify.com/v1/me";
        return fetch(url, {
            headers: {
                "Authorization": 'Bearer ' + accessToken,
                "Content-Type": "application/json"
            }
        })
        .then(r => r.json())
        .then(profile => {
            localStorage.setItem("user_id", profile.id);
            localStorage.setItem("user_profile", JSON.stringify(profile));
            return saveUserProfile(profile);
        });
    }

    async function initLoginUser () {
        if (!accessToken) {await fetchAccessToken()}
        let done = await fetchUserProfile();
        // if (done) window.location.replace("http://localhost:3000/home/loading");
        if (done) return;
    }

    async function saveUserProfile (profile) {
        // sinatra backend get / post user
        fetch(`${BASE_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "spotify_id": profile.id,
                "username": profile.display_name
            })
        })
        // JSON get / post user
        return await fetch(`${BASE_URL}/users`, {
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(r => r.json())
        .then(async (users) => {
            if (!users.find(ele => ele.id === profile.id)) {
                return await fetch(`${BASE_URL}/users`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: profile.id,
                        songs: [],
                    })
                })
            } else {return profile}
        })
    }

    return initLoginUser();

}