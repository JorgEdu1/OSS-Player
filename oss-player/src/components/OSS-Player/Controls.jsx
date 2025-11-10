import React from 'react';
import { usePlayer } from './hooks';
import { ProgressBar } from './ProgressBar';
import { PlayPauseButton } from './PlayPauseButton';
import { VolumeControl } from './VolumeControl';
import { FullscreenButton } from './FullscreenButton';
import { TimeDisplay } from './TimeDisplay';
import { SpeedControl } from './SpeedControl'; 
import { SubtitlesButton } from './SubtitlesButton';

export const Controls = ({ showSpeedControl }) => {
  const { stopPropagation, showSubtitles, subtitlesSrc } = usePlayer();

  return (
    <div 
      className="controls" 
      onClick={stopPropagation}
      onDoubleClick={stopPropagation}
    >
      <ProgressBar />

      <div className="bottom-controls">
        <div className="controls-left">
          <TimeDisplay />
        </div>

        <div className="controls-center">
          <PlayPauseButton />
          <VolumeControl />
        </div>

        <div className="controls-right">
          
          {showSpeedControl && (
            <SpeedControl />
          )}

          {showSubtitles && subtitlesSrc && (
            <SubtitlesButton />
          )}

          <FullscreenButton />
        </div>
      </div>
    </div>
  );
};