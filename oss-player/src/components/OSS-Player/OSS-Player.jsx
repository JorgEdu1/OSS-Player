import React, { useRef, useState, useEffect } from 'react';
import './OSS-Player.css';
import { PlayerContext } from './PlayerContext';
import { Controls } from './Controls';

export const OssPlayer = ({ 
  src, 
  showSpeedControl = true, 
  showSubtitles = true,
  subtitlesSrc = null
}) => {
  
  const videoRef = useRef(null);
  const playerWrapperRef = useRef(null);
  const lastVolumeRef = useRef(1);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(1); 

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleDurationChange = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;
    if (total > 0) {
      const progressPercent = (current / total) * 100;
      setCurrentTime(current);
      setProgress(progressPercent);
    }
  };

  const handleSeek = (e) => {
    const barWidth = e.currentTarget.clientWidth;
    const clickPositionX = e.nativeEvent.offsetX;
    const clickPercent = (clickPositionX / barWidth);
    const newTime = clickPercent * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVideoClick = () => {
    handlePlayPause();
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerWrapperRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    videoRef.current.muted = newVolume === 0;
    if (newVolume > 0) {
      lastVolumeRef.current = newVolume;
    }
  };

  const handleMuteToggle = () => {
    if (volume > 0) {
      lastVolumeRef.current = volume;
      setVolume(0);
      videoRef.current.volume = 0;
      videoRef.current.muted = true;
    } else {
      const newVolume = lastVolumeRef.current > 0 ? lastVolumeRef.current : 1;
      setVolume(newVolume);
      videoRef.current.volume = newVolume;
      videoRef.current.muted = false;
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const providerValue = {
    videoRef,
    playerWrapperRef,
    isPlaying,
    currentTime,
    duration,
    progress,
    isFullscreen,
    volume,
    handlePlayPause,
    handleDurationChange,
    handleTimeUpdate,
    handleSeek,
    handleVideoClick,
    stopPropagation,
    handleFullscreen,
    handleVolumeChange,
    handleMuteToggle,
    showSubtitles,
    subtitlesSrc
  };

  return (
    <PlayerContext.Provider value={providerValue}>
      <div 
        className="oss-player-wrapper" 
        onClick={handleVideoClick} 
        ref={playerWrapperRef}
        onDoubleClick={handleFullscreen}
      > 
        <video 
          ref={videoRef} 
          src={src}
          onDurationChange={handleDurationChange}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)} 
          onLoadedData={() => { 
            if(videoRef.current) {
              videoRef.current.volume = volume; 
            }
          }}
        >
          {showSubtitles && subtitlesSrc && (
            <track 
              kind="subtitles" 
              src={subtitlesSrc} 
              srcLang="pt" 
              label="Português" 
              default 
            />
          )}
        </video>

        <Controls showSpeedControl={showSpeedControl} />
      </div>
    </PlayerContext.Provider>
  )
};