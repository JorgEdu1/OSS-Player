import React from 'react';
import { usePlayer } from './hooks';
import { MdReplay10, MdForward10 } from "react-icons/md";

export const SkipButtons = () => {
  const { handleSkip } = usePlayer();

  return (
    <div className="skip-buttons-wrapper">
      <button onClick={() => handleSkip(-10)} title="Voltar 10s">
        <MdReplay10 />
      </button>
      <button onClick={() => handleSkip(10)} title="Avançar 10s">
        <MdForward10 />
      </button>
    </div>
  );
};