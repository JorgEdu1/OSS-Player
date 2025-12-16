import React, { useState } from 'react';
import { usePlayer } from './hooks';

export const SpeedControl = () => {
    const { playbackSpeed, handleChangeSpeed } = usePlayer();
    const [showMenu, setShowMenu] = useState(false);
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const onSelectSpeed = (speedValue) => {
        handleChangeSpeed(speedValue)
        setShowMenu(false);
    };

    return (
        <div className="speed-control-wrapper">
            {showMenu && (
                <ul className="speed-menu">
                    {speeds.map((speed) => (
                        <li
                            key={speed}
                            onClick={() => onSelectSpeed(speed)}
                            className={playbackSpeed === speed ? 'active' : ''}
                        >
                            {speed === 1 ? 'Normal' : `${speed}x`}
                        </li>
                    ))}
                </ul>
            )}

            <button onClick={toggleMenu} className="speed-button">
                {playbackSpeed === 1 ? '1x' : `${playbackSpeed}x`}
            </button>
        </div>
    );
};