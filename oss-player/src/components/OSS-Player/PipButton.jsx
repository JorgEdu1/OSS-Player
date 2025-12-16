import React from 'react';
import { useState } from 'react';
import { usePlayer } from './hooks';
import { MdPictureInPictureAlt } from "react-icons/md";

export const PipButton = () => {
  const { handlePipToggle, isPip } = usePlayer();
  const [isHovered, setIsHovered] = useState(false);


  if (!document.pictureInPictureEnabled) {
    return null;
  }

  const defaultStyle = {
    color: isPip ? 'var(--oss-primary)' : 'white'
  };

  const hoverStyle = {
    color: 'var(--oss-primary)',
    filter: 'brightness(1.2)'
  };

  const style = isHovered ? { ...defaultStyle, ...hoverStyle } : defaultStyle;

  return (
    <button 
      onClick={handlePipToggle} 
      title="Picture-in-Picture (P)"
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <MdPictureInPictureAlt />
    </button>
  );
};