import React from 'react'
import { useSearchParams } from 'react-router-dom';
import { Base64 } from 'js-base64';
import { CLIENT_ID, CLIENT_SECRET } from '../keys';

function Login() {

  const [searchParams] = useSearchParams();
  let accessToken = localStorage.getItem("access_token");

  if (searchParams.get('code')) {
    console.log('initializing ...');
    initApp();
  } else if (!!accessToken) {
    window.location.replace("http://localhost:3000/loading");
  } else {
    console.log('please log in');
  }

  function fetchAccessToken () {
    console.log('fetching access token ...');
    const query = new URLSearchParams({
      grant_type: "authorization_code",
      code: searchParams.get('code'),
      redirect_uri: "http://localhost:3000/login",
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
      return profile;
    });
  }

  async function initApp () {
    if (!accessToken) {await fetchAccessToken()}
    let done = await fetchUserProfile();
    if (done) window.location.replace("http://localhost:3000/loading");
  }

  return (
    <div>Login</div>
  )
}

export default Login