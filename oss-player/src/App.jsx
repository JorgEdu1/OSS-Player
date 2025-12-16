import React from 'react'
import { OssPlayer } from './components/OSS-Player/OSS-Player'
import './App.css'
import meuVideo from './assets/meu-video.mp4'
// import video1080 from './assets/meu-video.mp4'
// import video720 from './assets/outro-video.mp4'

function App() {

  // Exemplo passando um array para src (qualidades)  
  // const videoSources = [
  //   { label: '1080p', url: video1080 },
  //   { label: '720p',  url: video720 },
  // ];
  
  return (
    <>
      <h1>Testando o OSS-Player!</h1>
      
      <OssPlayer src={meuVideo} showSpeedControl={true} />
      {/* <OssPlayer src={videoSources} showSpeedControl={true}/> */}
    </>
  )
}

export default App