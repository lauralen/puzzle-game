import React, { useState, useEffect } from "react";
import style from "./GameBoard.module.scss";

const GameBoard = ({ image, isLoading, setIsLoading, error, puzzleSize }) => {
  const [pieces, setPieces] = useState([]);
  const [shuffled, setShuffled] = useState([]);

  const { height, width, pieceSize } = puzzleSize;

  const rowCount = height / pieceSize;
  const columnCount = width / pieceSize;
  const imageUrl = image.urls.custom;

  useEffect(() => {
    let pieces = getPieces();

    setPieces(pieces);
    setShuffled(getShuffledPieces(pieces));
    setIsLoading(false);
  }, [image]);

  const getPieces = () => {
    const piecesCount = rowCount * columnCount;
    let pieces = [...Array(piecesCount)];

    return pieces.map((piece, index) => {
      return (piece = {
        position: index,
        solved: false,
        backgroundPosition: getBackgroundPosition(index)
      });
    });
  };

  const getBackgroundPosition = index => {
    const column = getColumn(index);
    const row = getRow(index, column);

    let left = column * -pieceSize;
    let top = row * -pieceSize;

    return `${left}px ${top}px`;
  };

  const getColumn = index => {
    return index < columnCount ? index : getColumn(index - columnCount);
  };

  const getRow = (index, column) => {
    return (index - column) / columnCount;
  };

  const getShuffledPieces = pieces => {
    let shuffled = [...pieces];

    for (let i = shuffled.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  };

  const onDragStart = (event, piece) => {
    event.dataTransfer.setData("piece", piece);
  };

  const onDragOver = event => {
    event.preventDefault();
  };

  const onDrop = (event, target) => {
    let piece = Number(event.dataTransfer.getData("piece"));

    if (piece === target) {
      let updatedPieces = pieces.map((piece, index) => {
        if (piece.position === target) {
          return { ...piece, solved: true };
        } else return piece;
      });

      setPieces(updatedPieces);
      setShuffled(shuffled.filter(piece => piece.position !== target));
    } else return;
  };

  return (
    <div className={style.gameBoard}>
      {isLoading ? (
        <p>loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div
            className={style.puzzle}
            style={{
              width: `${width}px`,
              height: `${height}px`,
              backgroundImage: `url(${imageUrl})`
            }}
          >
            {pieces.map(piece => {
              return (
                <div
                  key={piece.position}
                  className={piece.solved ? style.solved : null}
                  onDragOver={event => onDragOver(event)}
                  onDrop={event => {
                    onDrop(event, piece.position);
                  }}
                >
                  {piece.position}
                  {piece.solved}
                </div>
              );
            })}
          </div>
          <div className={style.pieces}>
            {shuffled.map(piece => {
              return (
                <div
                  key={piece.position}
                  draggable
                  onDragStart={event => onDragStart(event, piece.position)}
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundPosition: `${piece.backgroundPosition}`
                  }}
                >
                  {piece.position}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default GameBoard;
