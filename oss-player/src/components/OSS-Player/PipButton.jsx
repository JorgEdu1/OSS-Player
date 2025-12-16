import React from 'react';
import { usePlayer } from './hooks';
import { MdPictureInPictureAlt } from "react-icons/md";

export const PipButton = () => {
  const { handlePipToggle, isPip } = usePlayer();

  if (!document.pictureInPictureEnabled) {
    return null;
  }

  return (
    <button 
      onClick={handlePipToggle} 
      title="Picture-in-Picture (P)"
      style={{ color: isPip ? '#4facfe' : 'white' }}
    >
      <MdPictureInPictureAlt />
    </button>
  );
};