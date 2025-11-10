import React from 'react';
import { usePlayer } from './hooks';

export const ProgressBar = () => {
  const { progress, handleSeek } = usePlayer();

  return (
    <div className="progress-bar-container" onClick={handleSeek}>
      <div 
        className="progress-bar-filled" 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};