import React, { useState } from 'react';
import { usePlayer } from './hooks';

export const SpeedControl = () => {
    const { videoRef } = usePlayer();
    const [showMenu, setShowMenu] = useState(false);
    const [currentSpeed, setCurrentSpeed] = useState(1);
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleChangeSpeed = (speedValue) => {
        if (videoRef.current) {
            videoRef.current.playbackRate = speedValue;
        }
        setCurrentSpeed(speedValue);
        setShowMenu(false);
    };

    return (
        <div className="speed-control-wrapper">
            {showMenu && (
                <ul className="speed-menu">
                    {speeds.map((speed) => (
                        <li
                            key={speed}
                            onClick={() => handleChangeSpeed(speed)}
                            className={currentSpeed === speed ? 'active' : ''}
                        >
                            {speed === 1 ? 'Normal' : `${speed}x`}
                        </li>
                    ))}
                </ul>
            )}

            <button onClick={toggleMenu} className="speed-button">
                {currentSpeed === 1 ? '1x' : `${currentSpeed}x`}
            </button>
        </div>
    );
};