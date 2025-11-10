import React from 'react';
import { usePlayer } from './hooks';
import { FaClosedCaptioning } from "react-icons/fa";

export const SubtitlesButton = () => {
  return (
    <button>
      <FaClosedCaptioning />
    </button>
  );
};