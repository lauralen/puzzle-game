import React from 'react';

const Piece = ({ piece, position, imageUrl, onDragStart, onDrag, onDrop }) => {
  return (
    <div
      onMouseDown={onDragStart}
      onTouchStart={onDragStart}
      onMouseMove={onDrag}
      onTouchMove={onDrag}
      onMouseUp={onDrop}
      onTouchEnd={onDrop}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: piece.backgroundPosition,
        transform: position
          ? 'translate3d(' + position.x + 'px, ' + position.y + 'px, 0)'
          : 'none'
      }}
    />
  );
};

export default Piece;
