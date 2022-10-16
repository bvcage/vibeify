const URL = 'http://localhost:9292'
let USER = localStorage.getItem('user_spotify_id')

export function fetchFromSinatra (ext) {
   const userId = localStorage.getItem('user_id')
   return fetch (`${URL}/users/${userId}/${ext}`, {
      headers: {
         'Accept': 'application/json'
      }
   }).then(r=>r.json())
}

export function saveToSinatra (ext, data) {
   console.log(`> saving data to ${ext}...`)
   refreshUser()
   const post = {
      'user': USER,
      'data': data
   }
   return fetch (URL + ext, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
      },
      body: JSON.stringify(post)
   }).then(r=>r.json())
}

function refreshUser () {
   USER = localStorage.getItem('user_spotify_id')
}