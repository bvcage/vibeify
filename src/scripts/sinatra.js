const URL = 'http://localhost:9292'

export function saveToSinatra (ext, data) {
   console.log(`> saving data to ${ext}...`)
   const user = localStorage.getItem('user_id')
   const post = {
      'user': user,
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