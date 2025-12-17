import React from 'react';
import { usePlayer } from './hooks';
import { MdSubtitles, MdSubtitlesOff } from "react-icons/md";

export const SubtitlesButton = () => {
  const { handleSubtitleToggle, isSubtitleActive } = usePlayer();

  return (
    <button 
      onClick={handleSubtitleToggle}
      title={isSubtitleActive ? "Desativar Legendas" : "Ativar Legendas"}
      style={{
        color: isSubtitleActive ? 'var(--oss-primary)' : '#fff',
        opacity: isSubtitleActive ? 1 : 0.6,
        transition: 'all 0.2s'
      }}
    >
      {isSubtitleActive ? <MdSubtitles /> : <MdSubtitlesOff />}
    </button>
  );
};