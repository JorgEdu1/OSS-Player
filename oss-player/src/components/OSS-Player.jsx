import React, { useRef, useState } from 'react'

export const OssPlayer = ({ src, showSpeedControl = true }) => {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };
  
  return (
    <div className="oss-player-wrapper">
      <video ref={videoRef} src={src}></video>

      <div className="controls">
        <button onClick={handlePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        {showSpeedControl && (
          <button>1x</button>
        )}
      </div>
    </div>
  )
}