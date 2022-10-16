import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LinearProgress } from '@mui/material'
import { saveToSinatra } from '../scripts/sinatra'
import { getAudioFeatures, getPlaylists, getSongs } from '../scripts/spotify'

function LoadingPage () {

  const navigate = useNavigate()

  const breaks = [0, 8, 16, 33, 49, 66, 83, 99, 100]
  const [progress, setProgress] = useState(breaks[0])
  const [buffer, setBuffer] = useState(breaks[1])

  useEffect(()=>{
    // get playlists & save
    getPlaylists()
    .then(data => {
      setProgress(breaks[1])
      setBuffer(breaks[2])
      return saveToSinatra('/playlists', data)
    })
    // get songs
    .then(data => {
      setProgress(breaks[2])
      setBuffer(breaks[3])
      return getSongs(data)
    })
    // save to join table (saves)
    .then(data => {
      setProgress(breaks[3])
      setBuffer(breaks[4])
      return saveToSinatra('/saves', data)
    })
    // save songs
    .then(data => {
      setProgress(breaks[4])
      setBuffer(breaks[5])
      const songs = data.map(playlist => saveToSinatra('/songs', playlist.songs))
      return Promise.all(songs)
    })
    // get audio features
    .then(data => {
      setProgress(breaks[5])
      setBuffer(breaks[6])
      const songs = data.flat()
      return getAudioFeatures(songs)
    })
    // save audio features
    .then(data => {
      setProgress(breaks[6])
      setBuffer(breaks[7])
      const features = data.map(item => item.audio_features).flat()
      return saveToSinatra('/audio-features', features)
    })
    // complete progress & redirect
    .then(() => {
      setProgress(breaks[7])
      setBuffer(breaks[8])
      setTimeout(() => navigate('/about'), 2000)
    })
  }, [])

  return (
    <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
  )
}

export default LoadingPage