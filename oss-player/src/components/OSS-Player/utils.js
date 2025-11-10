export const formatTime = (timeInSeconds) => {
  const time = Number.isFinite(timeInSeconds) ? timeInSeconds : 0;
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};