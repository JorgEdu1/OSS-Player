import React from 'react';
import { usePlayer } from './hooks';
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

export const VolumeControl = () => {
  const { volume, handleVolumeChange, handleMuteToggle } = usePlayer();

  return (
    <div className="volume-control-wrapper">
      <button onClick={handleMuteToggle}>
        {volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
      <input 
        type="range"
        className="volume-slider"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
      />
    </div>
  );
};