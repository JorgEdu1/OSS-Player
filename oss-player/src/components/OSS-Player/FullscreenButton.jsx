import React from 'react';
import { usePlayer } from './hooks';
import { FaExpand, FaCompress } from "react-icons/fa";

export const FullscreenButton = () => {
  const { isFullscreen, handleFullscreen } = usePlayer();

  return (
    <button onClick={handleFullscreen}>
      {isFullscreen ? <FaCompress /> : <FaExpand />}
    </button>
  );
};