import React from 'react';

const Piece = ({ piece, onDragStart, imageUrl }) => {
  return (
    <div
      draggable
      onDragStart={event => onDragStart(event, piece.index)}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: piece.backgroundPosition,
        top: piece.top,
        left: piece.left
      }}
    >
      {piece.index}
    </div>
  );
};

export default Piece;
