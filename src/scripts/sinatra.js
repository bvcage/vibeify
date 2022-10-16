const URL = 'http://localhost:9292'
let USER_ID = localStorage.getItem('user_id')
let USER_SID = localStorage.getItem('user_spotify_id')

export function cleanupSinatra () {
   refreshUser()
   return fetch (`${URL}/users/${USER_ID}/cleanup`, {
      method: 'DELETE'
   })
}

export function fetchFromSinatra (ext) {
   refreshUser()
   return fetch (`${URL}/users/${USER_ID}/${ext}`, {
      headers: {
         'Accept': 'application/json'
      }
   }).then(r=>r.json())
}

export function putToSinatra (ext, id, data) {
   refreshUser()
   const put = {
      'user': USER_SID,
      'data': data
   }
   return fetch (URL + ext + `/${id}`, {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
      },
      body: JSON.stringify(put)
   }).then(r=>r.json())
}

export function saveToSinatra (ext, data) {
   console.log(`> saving data to ${ext}...`)
   refreshUser()
   const post = {
      'user': USER_SID,
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
   USER_ID = localStorage.getItem('user_id')
   USER_SID = localStorage.getItem('user_spotify_id')
}