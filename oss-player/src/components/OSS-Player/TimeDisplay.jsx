import React from 'react';
import { usePlayer } from './hooks';
import { formatTime } from './utils';

export const TimeDisplay = () => {
  const { currentTime, duration } = usePlayer();

  return (
    <span className="time-display">
      {formatTime(currentTime)} / {formatTime(duration)}
    </span>
  );
};