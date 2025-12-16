import React, { useRef, useState, useEffect, useCallback } from 'react';
import './OSS-Player.css';
import { PlayerContext } from './PlayerContext';
import { Controls } from './Controls';

export const OssPlayer = ({
                              src,
                              showSpeedControl = true,
                              showSubtitles = true,
                              subtitlesSrc = null,
                              primaryColor = "#df262fff"
                          }) => {

    const videoRef = useRef(null);
    const playerWrapperRef = useRef(null);
    const lastVolumeRef = useRef(1);
    const volumeTimeoutRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isVolumeControlVisible, setIsVolumeControlVisible] = useState(false);
    const [isPip, setIsPip] = useState(false)

    const handlePlayPause = useCallback(() => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    }, []);

    const handleSkip = useCallback((amount) => {
        if (videoRef.current) {
            videoRef.current.currentTime += amount;
            setCurrentTime(videoRef.current.currentTime);
        }
    }, []);

    const handlePipToggle = useCallback(async () => {
        try {
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
                setIsPip(false);
            } else if (videoRef.current) {
                await videoRef.current.requestPictureInPicture();
                setIsPip(true);
            }
        } catch (error) {
            console.error("Erro ao ativar PiP:", error);
        }
    }, []);

    const handleDurationChange = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleTimeUpdate = () => {
        if (!videoRef.current) return;
        const current = videoRef.current.currentTime;
        const total = videoRef.current.duration;
        if (total > 0) {
            const progressPercent = (current / total) * 100;
            setCurrentTime(current);
            setProgress(progressPercent);
        }
    };

    const handleSeek = (e) => {
        const barWidth = e.currentTarget.clientWidth;
        const clickPositionX = e.nativeEvent.offsetX;
        const clickPercent = (clickPositionX / barWidth);
        const newTime = clickPercent * duration;
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleVideoClick = () => {
        handlePlayPause();
    };

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    const handleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            playerWrapperRef.current.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    }, []);

    const updateVolume = useCallback((newVolume) => {
        const clampedVolume = Math.min(1, Math.max(0, newVolume));

        setVolume(clampedVolume);
        if(videoRef.current) {
            videoRef.current.volume = clampedVolume;
            videoRef.current.muted = clampedVolume === 0;
        }

        if (clampedVolume > 0) {
            lastVolumeRef.current = clampedVolume;
        }

        setIsVolumeControlVisible(true);

        if (volumeTimeoutRef.current) {
            clearTimeout(volumeTimeoutRef.current);
        }

        volumeTimeoutRef.current = setTimeout(() => {
            setIsVolumeControlVisible(false);
        }, 2000);
    }, []);

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        updateVolume(newVolume);
    };

    const handleMuteToggle = useCallback(() => {
        if (volume > 0) {
            lastVolumeRef.current = volume;
            // Reutiliza updateVolume para garantir a animação
            updateVolume(0);
        } else {
            const newVolume = lastVolumeRef.current > 0 ? lastVolumeRef.current : 1;
            updateVolume(newVolume);
        }
    }, [volume, updateVolume]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        const handlePipChange = () => {
            setIsPip(!!document.pictureInPictureElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);

        const videoEl = videoRef.current;

        if (videoEl) {
            videoEl.addEventListener('enterpictureinpicture', handlePipChange);
            videoEl.addEventListener('leavepictureinpicture', handlePipChange);
        }

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            if (videoEl) {
                videoEl.removeEventListener('enterpictureinpicture', handlePipChange);
                videoEl.removeEventListener('leavepictureinpicture', handlePipChange);
            }
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (document.activeElement.tagName === 'INPUT') return;

            const key = e.key.toLowerCase();

            switch(key) {
                case ' ':
                case 'k':
                    e.preventDefault();
                    handlePlayPause();
                    break;

                case 'f':
                    handleFullscreen();
                    break;

                case 'm':
                    handleMuteToggle();
                    break;

                case 'p':
                    handlePipToggle();
                    break;

                case 'arrowright':
                    e.preventDefault();
                    handleSkip(5);
                    break;

                case 'arrowleft':
                    e.preventDefault();
                    handleSkip(-5);
                    break;

                case 'arrowup':
                    e.preventDefault();
                    updateVolume(volume + 0.1);
                    break;

                case 'arrowdown':
                    e.preventDefault();
                    updateVolume(volume - 0.1);
                    break;

                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [volume, handlePlayPause, handleFullscreen, handleMuteToggle, updateVolume]);

    const providerValue = {
        videoRef,
        playerWrapperRef,
        isPlaying,
        currentTime,
        duration,
        progress,
        isFullscreen,
        isPip,
        volume,
        isVolumeControlVisible,
        handlePlayPause,
        handleSkip,
        handlePipToggle,
        handleDurationChange,
        handleTimeUpdate,
        handleSeek,
        handleVideoClick,
        stopPropagation,
        handleFullscreen,
        handleVolumeChange,
        handleMuteToggle,
        showSubtitles,
        subtitlesSrc
    };

    return (
        <PlayerContext.Provider value={providerValue}>
            <div
                className="oss-player-wrapper"
                onClick={handleVideoClick}
                ref={playerWrapperRef}
                onDoubleClick={handleFullscreen}
                style={{ '--oss-primary': primaryColor }}
            >
                <video
                    ref={videoRef}
                    src={src}
                    onDurationChange={handleDurationChange}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => setIsPlaying(false)}
                    onLoadedData={() => {
                        if(videoRef.current) {
                            videoRef.current.volume = volume;
                        }
                    }}
                >
                    {showSubtitles && subtitlesSrc && (
                        <track
                            kind="subtitles"
                            src={subtitlesSrc}
                            srcLang="pt"
                            label="Português"
                            default
                        />
                    )}
                </video>

                <Controls showSpeedControl={showSpeedControl} />
            </div>
        </PlayerContext.Provider>
    )
}