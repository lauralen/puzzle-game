export const formatTime = time => {
  if (time >= 3600) return '> hour';

  let minutes = time >= 60 ? Math.floor(time / 60) : '00';
  let seconds = time - minutes * 60;
  if (seconds < 10) seconds = `0${seconds}`;

  return `${minutes}:${seconds}`;
};
