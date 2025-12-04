import React from 'react'
import { OssPlayer } from './components/OSS-Player/OSS-Player'
import './App.css'
import meuVideo from './assets/meu-video.mp4'

function App() {
  
  return (
    <>
      <h1>Testando o OSS-Player!</h1>
      
      <OssPlayer src={meuVideo} showSpeedControl={true} />
    </>
  )
}

export default App