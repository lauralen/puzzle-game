export const formatTime = time => {
  if (time >= 3600) return '> hour';

  let minutes = time >= 60 ? Math.floor(time / 60) : '00';
  let seconds = time - minutes * 60;
  if (seconds < 10) seconds = `0${seconds}`;

  return `${minutes}:${seconds}`;
};

export const getRandomNumberInRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const getColumn = (index, piecesPerPuzzleSide) => {
  return index < piecesPerPuzzleSide
    ? index
    : getColumn(index - piecesPerPuzzleSide, piecesPerPuzzleSide);
};

export const getRow = (index, column, piecesPerPuzzleSide) => {
  return (index - column) / piecesPerPuzzleSide;
};

export const getAdjacentPieces = (index, column, row, piecesPerPuzzleSide) => {
  let pieces = {};

  index >= piecesPerPuzzleSide &&
    Object.assign(pieces, { top: index - piecesPerPuzzleSide });

  column < piecesPerPuzzleSide - 1 &&
    Object.assign(pieces, { right: index + 1 });

  row < piecesPerPuzzleSide - 1 &&
    Object.assign(pieces, { bottom: index + piecesPerPuzzleSide });

  column !== 0 && Object.assign(pieces, { left: index - 1 });

  return pieces;
};
