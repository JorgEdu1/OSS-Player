import React from 'react';
import { usePlayer } from './hooks';
import { FaPlay, FaPause } from "react-icons/fa";

export const PlayPauseButton = () => {
  const { isPlaying, handlePlayPause } = usePlayer();

  return (
    <button onClick={handlePlayPause}>
      {isPlaying ? <FaPause /> : <FaPlay />}
    </button>
  );
};