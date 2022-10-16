import { Base64 } from 'js-base64'
import { CLIENT_ID, CLIENT_SECRET } from '../keys'
import { saveToSinatra } from './sinatra'

let access_token = localStorage.getItem('access_token')

export async function authorizeVibeify () {
   console.log('authorizing app...')
   const authCode = await getAuthCode()
   const tokens = await getTokens(authCode)
   const user = await getUserProfile(tokens)
   return user
}

export async function getAudioFeatures (songs) {
   console.log('fetching audio features...')
   refreshTokens()
   const api = 'https://api.spotify.com/v1/audio-features'
   const num = songs.length
   const limit = 100
   let features = []
   for (let i = 0; i < num; i += limit) {
      const slice = songs.slice(i, i + limit)
      const songIds = slice.map(item => item.spotify_id).join()
      const query = new URLSearchParams({
         ids: songIds
      })
      features.push(fetch(api + '?' + query, {
         headers: {
            "Authorization": 'Bearer ' + access_token,
            "Content-Type": "application/json"
         }
      }).then(r=>r.json()))
   }
   return new Promise(resolve => {
      Promise.all(features).then(data => resolve(data))
   })
}

export async function getPlaylists () {
   console.log('fetching playlists...')
   refreshTokens()
   const api = 'https://api.spotify.com/v1/me/playlists'
   return new Promise(resolve => {
      getFromSpotify(api).then(data => resolve(data))
   })
}

export async function getSongs (playlists) {
   console.log('fetching songs...')
   refreshTokens()
   let songs = []
   if (Array.isArray(playlists)) {
      songs = playlists.map(async playlist => {
         const api = `https://api.spotify.com/v1/playlists/${playlist.spotify_id}/tracks`
         playlist.songs = await getFromSpotify(api)
         return playlist
      })
   }
   return new Promise(resolve => {
      Promise.all(songs).then(data => resolve(data))
   })
}

function genRandomString(length) {
   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
   const numPossible = possible.length
   let randString = ''
   for (let i=0; i<length; ++i) {
      randString += possible.charAt(Math.floor(Math.random() * numPossible))
   }
   return randString
}

async function getAuthCode () {
   // spotify api url
   const query = new URLSearchParams({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: 'user-library-read playlist-read-private playlist-modify-private',
      redirect_uri: 'http://localhost:3000/loading',
      state: genRandomString(20),
      // code_challenge_method: "S256",
      // code_challenge: "",
      // show_dialog: true,
   })
   const url = 'https://accounts.spotify.com/authorize?' + query

   // user auth popup
   const width = 600
   const height = 800
   const left = ( window.screen.availWidth - width ) / 2
   const top = ( window.screen.availHeight - height ) / 2
   const loginPopup = window.open(url, 'popup',
         `menubar=no,
         location=no,
         width=${width},
         height=${height},
         left=${left},
         top=${top},
         popup=true`)

   // check until popup is closed then return auth code
   return await new Promise(resolve => {
      const checkPopup = setInterval(() => {
         if (loginPopup.window.location.href.includes('http://localhost:3000')) loginPopup.close()
         if (!loginPopup || !loginPopup.closed) return
         clearInterval(checkPopup)
         const urlParams = new URLSearchParams(loginPopup.window.location.search)
         const code = urlParams.get('code')
         resolve(code)
      }, 500)
   })
}

async function getData (url, info) {
   // setup return object
   let data = []
   // check apiUrl has query character at end
   if (url.charAt(url.length - 1) !== '?') {url += '?'}
   // call to API to get all items
   const limit = 50
   const numCalls = Math.ceil(info.total / limit)
   for (let i = 0; i < numCalls; ++i) {
      const query = new URLSearchParams({
         offset: limit * i,
         limit: limit
      })
      await fetch (url + query, {
            headers: {
               'Authorization': 'Bearer ' + access_token,
               'Content-Type': 'application/json'
            }
      })
      .then(r => r.json())
      .then(f => {data.push(...f.items)})
   }
   return data
}

async function getFromSpotify (url) {
   const info = await getInfo(url)
   const data = await getData(url, info)
   return data
}

function getInfo (url) {
   url += "?limit=1"
   return fetch(url, {
      headers: {
         "Authorization": 'Bearer ' + access_token,
         "Content-Type": "application/json"
      }
   }).then(r=>r.json()).then(data=>{
      return data
   })
}

async function getTokens (authCode) {
   console.log('fetching access token...')
   const query = new URLSearchParams({
      grant_type: "authorization_code",
      code: authCode,
      redirect_uri: 'http://localhost:3000/loading',
      client_id: CLIENT_ID,
   })
   const url = 'https://accounts.spotify.com/api/token?' + query
   return await fetch(url, {
      method: 'POST',
      headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Base64.encode(CLIENT_ID + ':' + CLIENT_SECRET).toString()
      },
      body: query,
   })
   .then(r => r.json())
   .then(data => {
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)
      return data
   })
   .catch(error => console.log(error))
}

async function getUserProfile (tokens) {
   const { access_token: accessToken } = tokens
   const url = "https://api.spotify.com/v1/me";
   return await fetch(url, {
      headers: {
         'Authorization': 'Bearer ' + accessToken,
         'Content-Type': 'application/json'
      }
   })
   .then(r => r.json())
   .then(profile => {
      localStorage.setItem('user_spotify_id', profile.id)
      localStorage.setItem('user_spotify_profile', JSON.stringify(profile))
      return profile
   });
}

function refreshTokens () {
   access_token = localStorage.getItem('access_token')
}