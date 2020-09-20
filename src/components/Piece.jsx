import React from 'react';

const Piece = ({ piece, onDragStart, imageUrl }) => {
  return (
    <div
      draggable
      onDragStart={event => onDragStart(event, piece.index)}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: piece.backgroundPosition
      }}
    />
  );
};

export default Piece;
