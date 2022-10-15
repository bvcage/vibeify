import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveToSinatra } from '../scripts/sinatra'
import { getAudioFeatures, getPlaylists, getSongs } from '../scripts/spotify'

function LoadingPage () {

  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)

  useEffect(()=>{
    // get playlists & save
    getPlaylists()            // get 5, save 7
    .then(data => {
      setProgress(8)
      return saveToSinatra('/playlists', data)
    })
    // get songs
    .then(data => {
      setProgress(16)
      return getSongs([data[0], data[8]])
    })
    // save to join table (saves)
    .then(data => {
      setProgress(33)
      return saveToSinatra('/saves', data)
    })
    // save songs
    .then(data => {
      setProgress(49)
      const songs = data.map(playlist => saveToSinatra('/songs', playlist.songs))
      return Promise.all(songs)
    })
    // get audio features
    .then(data => {
      setProgress(66)
      const songs = data.flat()
      return getAudioFeatures(songs)
    })
    // save audio features
    .then(data => {
      setProgress(83)
      const features = data.map(item => item.audio_features).flat()
      return saveToSinatra('/audio-features', features)
    })
    // complete progress & redirect
    .then(() => {
      setProgress(99)
      setTimeout(() => navigate('/about'), 2000)
    })
  }, [])

  return (
    <div>Loading... {progress}%</div>
  )
}

export default LoadingPage